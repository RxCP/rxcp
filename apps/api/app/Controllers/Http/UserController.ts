import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserController {
  public async patch({ auth, request, response }: HttpContextContract) {
    const firstName = request.input('first_name')
    const lastName = request.input('last_name')
    const userId = auth.use('api').user?.id

    try {
      const user = await User.findOrFail(userId)
      const res = await user
        .merge({
          first_name: firstName,
          last_name: lastName,
        })
        .save()

      return response.created({
        data: res,
      })
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

  public async updateEmail({ auth, request, response }: HttpContextContract) {
    const newEmail = request.input('new_email')
    const password = request.input('password')
    const authEmail = auth.use('api').user?.email || ''

    try {
      // check user credentials before updating the email
      const user = await auth.use('api').verifyCredentials(authEmail, password)
      const res = await user
        .merge({
          email: newEmail,
        })
        .save()

      return response.created({
        data: res,
      })
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
