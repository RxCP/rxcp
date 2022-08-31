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
  /**
   * Account list
   */
  public async index({ request, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::accounts.index')

    const page = request.input('page', 1)
    const limit = 10
    return Account.query().paginate(page, limit)
  }

  /**
   * Show account details
   */
  public async show({ params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::accounts.show')

    return {
      data: await Account.find(params?.id),
    }
  }

  /**
   * Create account
   */
  public async create({ auth, request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::accounts.create')

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
   */
  public async update({ auth, request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::accounts.update')

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
   * Delete account
   */
  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::accounts.destroy')

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
   * Get all characters associated from the account
   */
  public async getCharacters({ params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::accounts.getCharacters')

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
   * Validaate request's inputs
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
   * Get all required  fields
   */
  private getFormFields(request: RequestContract) {
    const payload = request.only(['user_id', 'password', 'gender', 'birthdate'])

    return {
      userId: payload.user_id,
      password: payload.password,
      gender: payload.gender,
      birthdate: payload.birthdate,
    }
  }
}
