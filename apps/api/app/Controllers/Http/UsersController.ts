import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ request, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.index')

    const page = request.input('page', 1)
    const limit = 10
    const users = await Database.from('users').paginate(page, limit)
    return users
  }

  public async show({ params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.show')

    return {
      data: await User.find(params?.id),
    }
  }
}
