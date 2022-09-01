import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Account from 'App/Models/Account'
import User from 'App/Models/User'
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
  public async create({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::accounts.create')
    const payload = request.only(['master_user_id', 'user_id', 'password', 'gender', 'birthdate'])
    const user = await User.find(payload?.master_user_id)

    if (!user) {
      return response.badRequest({
        errors: [
          {
            message: 'Invalid `master_user_id`',
          },
        ],
      })
    }

    // Validation
    await this.validateRequest(request, false)

    try {
      const account = await Account.create({
        userid: payload?.user_id,
        sex: payload.gender,
        birthdate: payload.birthdate,
        email: user?.email,
        user_pass: payload.password,
      })

      await Database.table('users_accounts').returning('id').insert({
        user_id: user?.id,
        account_id: account?.account_id,
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
   * Update account
   */
  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::accounts.update')
    const payload = request.only(['master_user_id', 'user_id', 'password', 'gender', 'birthdate'])

    // Check If they own the account
    const account = await Database.from('users_accounts')
      .select('account_id')
      .where('user_id', payload?.master_user_id)
      .where('account_id', params?.id)

    if (account && account.length <= 0) {
      return response.badRequest({
        errors: [
          {
            message: 'Invalid account!',
          },
        ],
      })
    }

    const user = await User.find(payload?.master_user_id)

    // Validation
    await this.validateRequest(request, true)

    try {
      const account = await Account.findOrFail(params?.id)
      await account
        .merge({
          userid: payload.user_id,
          sex: payload.gender,
          birthdate: payload.birthdate,
          email: user?.email,
          user_pass: payload.password,
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
      await Account.query().where('account_id', params?.id).delete()
      await Database.from('users_accounts').select('id').where('account_id', params?.id).delete()

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
}
