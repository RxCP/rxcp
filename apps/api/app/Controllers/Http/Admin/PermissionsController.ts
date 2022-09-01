import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
  /**
   * Permission list
   */
  public async index({ request, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::permissions.index')

    const page = request.input('page', 1)
    const limit = 10
    return Permission.query().paginate(page, limit)
  }
}
