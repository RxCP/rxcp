import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Character from 'App/Models/Character'

export default class CharactersController {
  /**
   * Character list
   */
  public async index({ request, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::characters.index')

    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    return Character.query()
      .preload('account', (query) => {
        query.select(['account_id', 'userid'])
      })
      .paginate(page, limit)
  }

  /**
   * Character details
   */
  public async show({ params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::characters.show')

    return {
      data: await Character.find(params?.id),
    }
  }

  /**
   * Get the account details of the character
   */
  public async getAccount({ params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::characters.getAccount')

    const characters = await Character.find(params?.id)
    const account = await characters?.related('account').query().first()
    return {
      data: account,
    }
  }

  /**
   * Total characters
   */
  public async total({ bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::characters.total')

    const fetchTotal = await Character.query().count('*', 'total').first()

    return {
      data: {
        total: fetchTotal?.$extras?.total,
      },
    }
  }
}
