import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Guild from 'App/Models/Guild'

export default class GuildsController {
  /**
   * Guild list
   */
  public async index({ request, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::guilds.index')

    const page = request.input('page', 1)
    const limit = 10
    return Guild.query().paginate(page, limit)
  }

  /**
   * Guild details
   */
  public async show({ params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::guilds.show')

    return {
      data: await Guild.find(params?.id),
    }
  }

  /**
   * Total guilds
   */
  public async total({ bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::guilds.total')

    const fetchTotal = await Guild.query().count('*', 'total').first()

    return {
      data: {
        total: fetchTotal?.$extras?.total,
      },
    }
  }
}
