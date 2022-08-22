import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { schema } from '@ioc:Adonis/Core/Validator'
import Account from 'App/Models/Account'
import {
  birthdateRules,
  genderRules,
  userIdRules,
  userIdUpdateRules,
} from 'App/validations/account'
import { passwordRules } from 'App/validations/user'

export default class AccountsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    return Account.query().paginate(page, limit)
  }

  public async find({ params }: HttpContextContract) {
    return {
      data: await Account.find(params?.id),
    }
  }

  public async getCharacters({ params }: HttpContextContract) {
    const account = await Account.find(params?.id)
    const characters = await account?.related('characters').query()
    return {
      data: characters,
      meta: {
        account_id: account?.account_id,
      },
    }
  }

  /**
   * Create account
   * @param param
   * @returns
   */
  public async create({ auth, request, response }: HttpContextContract) {
    const fields = this.getFormFields(request)
    const email = auth.use('api').user?.email

    // Validation
    await this.validateRequest(request, false)

    try {
      const account = await Account.create({
        userid: fields.userId,
        sex: fields.gender,
        birthdate: fields.birthdate,
        email,
        user_pass: fields.password,
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

  /**
   * Updaate account
   * @param param
   * @returns
   */
  public async update({ auth, request, response, params }: HttpContextContract) {
    const fields = this.getFormFields(request)
    const email = auth.use('api').user?.email

    // Validation
    await this.validateRequest(request, true)

    try {
      const account = await Account.findOrFail(params?.id)
      await account
        .merge({
          userid: fields.userId,
          sex: fields.gender,
          birthdate: fields.birthdate,
          email,
          user_pass: fields.password,
        })
        .save()

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

  /**
   * Soft delete an account
   * @param param
   * @returns
   */
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const account = await Account.findOrFail(params?.id)
      await account.delete()
      return response.noContent()
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
   * Validaate request's inputs
   * @param request
   * @param isUpdate
   */
  private async validateRequest(request: RequestContract, isUpdate?: boolean) {
    const accountSchema = schema.create({
      user_id: isUpdate ? userIdUpdateRules(request.params()?.id) : userIdRules,
      password: passwordRules(),
      gender: genderRules,
      birthdate: birthdateRules,
    })

    await request.validate({ schema: accountSchema })
  }

  /**
   *
   * @param request
   * @returns {object}
   */
  private getFormFields(request: RequestContract) {
    const userId = request.input('user_id')
    const password = request.input('password')
    const gender = request.input('gender')
    const birthdate = request.input('birthdate')

    return {
      userId,
      password,
      gender,
      birthdate,
    }
  }
}
