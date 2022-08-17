import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    return Permission.query().paginate(page, limit)
  }
}
