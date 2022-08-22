import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Guild from 'App/Models/Guild'

export default class GuildsController {
  /**
   * Guild list
   */
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    return Guild.query().paginate(page, limit)
  }

  /**
   * Guild details
   */
  public async find({ params }: HttpContextContract) {
    return {
      data: await Guild.find(params?.id),
    }
  }
}
