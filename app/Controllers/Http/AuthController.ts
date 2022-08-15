import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import { emailRules, firstNameRules, lastNameRules, passwordRules } from 'App/validations/user'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      return await auth.use('api').attempt(email, password)
    } catch {
      return response.unauthorized({
        errors: [
          {
            message: 'Invalid credentials',
          },
        ],
      })
    }
  }

  public async register({ auth, request, response }: HttpContextContract) {
    const firstName = request.input('first_name')
    const lastName = request.input('last_name')
    const email = request.input('email')
    const password = request.input('password')

    // Validation
    const postSchema = schema.create({
      first_name: firstNameRules,
      last_name: lastNameRules,
      email: emailRules,
      password: passwordRules,
    })

    // Validate
    await request.validate({ schema: postSchema })

    try {
      await User.create({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      })

      return await auth.use('api').attempt(email, password)
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
