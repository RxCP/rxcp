import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

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
      first_name: schema.string({ trim: true }, [rules.maxLength(20)]),
      last_name: schema.string({ trim: true }, [rules.maxLength(20)]),
      email: schema.string({ trim: true }, [
        rules.maxLength(20),
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({ trim: true }, [rules.minLength(6), rules.maxLength(20)]),
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
