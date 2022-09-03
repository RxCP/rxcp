import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Account from 'App/Models/Account'
import {
  birthdateRules,
  genderRules,
  userIdRules,
  userIdUpdateRules,
} from 'App/Validations/account'
import { passwordRules } from 'App/Validations/user'

export default class AccountsController {
  /**
   * Accounts of the logged-in user
   */
  public async index({ request, auth, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    const authId = auth.use('api').user?.id || ''

    try {
      const userAccountsIdObj = await Database.from('users_accounts')
        .select('account_id')
        .where('user_id', authId)

      const userAccountsId = userAccountsIdObj.map((o) => o.account_id)
      const accounts = await Account.query()
        .whereIn('account_id', userAccountsId)
        .paginate(page, limit)

      return accounts
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
   * Show account details of the logged-in user
   * The `params?.id` = `account_id` of the `login` table of `ragnarok`
   */
  public async show({ auth, params, response }: HttpContextContract) {
    const authId = auth.use('api').user?.id || ''
    const accountId = params?.id

    try {
      // Check If they own the account
      const account = await Database.from('users_accounts')
        .select('account_id')
        .where('user_id', authId)
        .where('account_id', accountId)

      return {
        data: account && account.length >= 1 ? await Account.find(params?.id) : [],
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

  /**
   * Create account under logged-in user
   */
  public async create({ auth, request, response }: HttpContextContract) {
    const authId = auth.use('api').user?.id || ''
    const payload = request.only(['user_id', 'password', 'gender', 'birthdate'])
    const email = auth.use('api').user?.email

    // Validation
    const accountSchema = schema.create({
      user_id: userIdRules,
      password: passwordRules(),
      gender: genderRules,
      birthdate: birthdateRules,
    })

    await request.validate({ schema: accountSchema })

    try {
      const account = await Account.create({
        userid: payload.user_id,
        sex: payload.gender,
        birthdate: payload.birthdate,
        email,
        user_pass: payload.password,
      })

      await Database.table('users_accounts').returning('id').insert({
        user_id: authId,
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
   * Update account of the logged-in user
   * The `params?.id` = `account_id` of the `login` table of `ragnarok
   * We need to check if the user owns the account first then run the validation after
   * we don't want to expose the `user_id` checking on validation to the client
   */
  public async update({ auth, request, response, params }: HttpContextContract) {
    const authId = auth.use('api').user?.id || ''
    const accountId = params?.id
    const payload = request.only(['user_id', 'gender', 'birthdate'])
    const email = auth.use('api').user?.email

    // Check If they own the account
    const userAccount = await Database.from('users_accounts')
      .select('account_id')
      .where('user_id', authId)
      .where('account_id', accountId)

    if (userAccount && userAccount.length <= 0) {
      return response.badRequest({
        errors: [
          {
            message: 'Invalid account_id',
          },
        ],
      })
    }

    // Validation
    // required to run the checking first of account ownership
    const accountSchema = schema.create({
      user_id: userIdUpdateRules(request.params()?.id),
      gender: genderRules,
      birthdate: birthdateRules,
    })

    await request.validate({ schema: accountSchema })

    try {
      const account = await Account.findOrFail(params?.id)
      await account
        .merge({
          userid: payload.user_id,
          sex: payload.gender,
          birthdate: payload.birthdate,
          email,
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
   * Get all characters associated from the account
   */
  public async getCharacters({ params, auth }: HttpContextContract) {
    const accountId = params?.id
    const authId = auth.use('api').user?.id || ''

    // Check If they own the account
    const userAccount = await Database.from('users_accounts')
      .select('account_id')
      .where('user_id', authId)
      .where('account_id', accountId)

    if (userAccount && userAccount.length <= 0) {
      return {
        data: [],
      }
    }

    const account = await Account.find(params?.id)
    const characters = await account?.related('characters').query()

    return {
      data: characters,
    }
  }
}
