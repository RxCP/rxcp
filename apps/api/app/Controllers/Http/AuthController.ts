import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import { emailRules, firstNameRules, lastNameRules, passwordRules } from 'App/Validations/user'
import { Limiter } from '@adonisjs/limiter/build/services/index'

export default class AuthController {
  /**
   * Login user
   */
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const throttleKey = `login_${email}_${request.ip()}`

    const limiter = Limiter.use({
      requests: 10,
      duration: '15 mins',
      blockDuration: '30 mins',
    })

    if (await limiter.isBlocked(throttleKey)) {
      return response.tooManyRequests({
        errors: [
          {
            message: 'Login attempts exhausted. Please try after some time',
          },
        ],
      })
    }

    try {
      const response = await auth.use('api').attempt(email, password, {
        expiresIn: '30days',
      })
      await limiter.delete(throttleKey)
      return response
    } catch {
      await limiter.increment(throttleKey)
      return response.unauthorized({
        errors: [
          {
            message: 'Invalid credentials',
          },
        ],
      })
    }
  }

  /**
   * Register new user
   */
  public async register({ auth, request, response }: HttpContextContract) {
    const payload = request.only(['first_name', 'last_name', 'email', 'password'])

    // Validation
    const registerSchema = schema.create({
      first_name: firstNameRules,
      last_name: lastNameRules,
      email: emailRules(),
      password: passwordRules(),
    })

    // Validate
    await request.validate({ schema: registerSchema })

    try {
      await User.create({
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: payload.password,
      })

      return await auth.use('api').attempt(payload.email, payload.password)
    } catch (e) {
      return response.badRequest({
        errors: [
          {
            message: e.toString(),
          },
        ],
      })
    }
  }
}
