import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Shop/Order'

export default class OrdersController {
  /**
   * Order list
   */
   public async index({ request, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::orders.index')

    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    return Order.query().paginate(page, limit)
  }
}
