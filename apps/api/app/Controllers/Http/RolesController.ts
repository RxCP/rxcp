import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    return Role.query().paginate(page, limit)
  }

  public async getPermissions({ request, params }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    const role = await Role.find(params?.id)
    const permissions = await role?.related('permissions').query().paginate(page, limit)
    return permissions
  }
}
