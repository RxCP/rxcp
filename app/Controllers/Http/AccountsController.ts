import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
import { birthdateRules, genderRules, passwordRules, userIdRules } from 'App/validations/account'
import { emailRules } from 'App/validations/user'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class AccountsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    return Account.query().paginate(page, limit)
  }
  public async create({ auth, request, response }: HttpContextContract) {
    const userId = request.input('userId')
    const password = request.input('password')
    const gender = request.input('gender')
    const birthdate = request.input('birthdate')

    const email = auth.use('api').user?.email

    if (!email) {
      return response.badRequest({
        errors: [
          {
            message: 'Invalid email',
          },
        ],
      })
    }

    // Validation
    const accountSchema = schema.create({
      userId: userIdRules,
      password: passwordRules,
      gender: genderRules,
      birthdate: birthdateRules,
    })

    await request.validate({ schema: accountSchema })

    try {
      const account = await Account.create({
        userid: userId,
        sex: gender,
        birthdate,
        email,
        user_pass: password,
      })

      return response.created({
        data: account,
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
