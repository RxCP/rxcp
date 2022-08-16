import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Character from 'App/Models/Character'

export default class CharactersController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    return Character.query().paginate(page, limit)
  }

  public async find({ params }: HttpContextContract) {
    return {
      data: await Character.find(params?.id),
    }
  }

  public async getAccount({ params }: HttpContextContract) {
    const characters = await Character.find(params?.id)
    const account = await characters?.related('account').query().first()
    return {
      data: account,
    }
  }
}
