import Encryption from '@ioc:Adonis/Core/Encryption'
import Event from '@ioc:Adonis/Core/Event'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import { emailRules, passwordRules } from 'App/Validations/user'

export default class UserController {
  /**
   * Currently logged-in user details
   */
  public async index({ auth }: HttpContextContract) {
    return {
      data: auth.use('api').user,
    }
  }

  /**
   * Update user info (for logged-in user)
   */
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

  /**
   * Update email (for logged-in user)
   */
  public async updateEmail({ auth, request, response }: HttpContextContract) {
    const newEmail = request.input('new_email')
    const password = request.input('password')
    const authEmail = auth.use('api').user?.email || ''

    const changePassSchema = schema.create({
      new_email: emailRules(),
    })

    await request.validate({ schema: changePassSchema })

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

  /**
   * Change password (for logged-in user)
   */
  public async changePass({ auth, request, response }: HttpContextContract) {
    const password = request.input('current_password')
    const newPass = request.input('new_password')
    const authEmail = auth.use('api').user?.email || ''

    const changePassSchema = schema.create({
      new_password: passwordRules('confirm_new_password'),
    })

    await request.validate({ schema: changePassSchema })

    try {
      // check user credentials first
      const user = await auth.use('api').verifyCredentials(authEmail, password)
      const res = await user
        .merge({
          password: newPass,
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

  /**
   * Reset password
   */
  public async resetPassword({ request }: HttpContextContract) {
    const randtoken = require('rand-token')
    const email = request.input('email')

    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
    })

    await request.validate({ schema: validationSchema })

    const user = await User.findBy('email', email)
    const token = Encryption.encrypt(randtoken.generate(16), '30 minutes')

    if (user) {
      user.resetPasswordToken = token
      await user.save()
      Event.emit('user:reset-password', { user, token })
    }

    return {
      token,
    }
  }

  /**
   * Verify token from resetting password
   */
  public async verifyTokenResetPass({ request, response }: HttpContextContract) {
    const token = request.input('token')

    if (!token) {
      throw new Error('Token not found!')
    }

    const newPassword = request.input('new_password')
    const changePassSchema = schema.create({
      new_password: passwordRules('confirm_new_password'),
    })

    await request.validate({ schema: changePassSchema })

    try {
      const res = Encryption.decrypt(token)

      if (!res) {
        throw new Error('Token expired!')
      }

      const user = await User.findByOrFail('reset_password_token', token)
      user.password = newPassword
      await user.save()

      return {
        message: 'Success',
      }
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
