import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'

export default class AccountsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    return Account.query().paginate(page, limit)
  }
}
