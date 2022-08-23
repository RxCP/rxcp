import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesController {
  /**
   * Role list
   */
  public async index({ request, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::roles.index')

    const page = request.input('page', 1)
    const limit = 10
    return Role.query().paginate(page, limit)
  }

  /**
   * Get all permissions under the role
   */
  public async getPermissions({ request, params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::roles.getPermissions')

    const page = request.input('page', 1)
    const limit = 10
    const role = await Role.find(params?.id)
    const permissions = await role?.related('permissions').query().paginate(page, limit)
    return permissions
  }
}
