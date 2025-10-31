import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Shop/Order'

export default class OrdersController {
  /**
   * Guild list
   */
   public async index({ auth, request }: HttpContextContract) {
    const authId = auth.use('api').user?.id || ''

    const page = request.input('page', 1)
    const limit = 10
    return Order.query().where('customer_id', authId).paginate(page, limit)
  }
}
