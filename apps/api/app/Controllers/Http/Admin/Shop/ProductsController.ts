import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Shop/Product'
import { descriptionRules, slugRules, statusRules, titleRules } from 'App/Validations/product'

export default class ProductsController {
  /**
   * Product list
   */
  public async index({ request, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::shop::product.index')

    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    return Product.query().paginate(page, limit)
  }

  /**
   * Show product details
   */
   public async show({ params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::shop::product.show')

    return {
      data: await Product.find(params?.id),
    }
  }

  /**
   * Create Product
   */
   public async create({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::shop::product.create')
    const payload = request.only(['title', 'description', 'slug', 'status'])
    
    // Validation
    const createProductSchema = schema.create({
      title: titleRules,
      description: descriptionRules,
      slug: slugRules(),
      status: statusRules,
    })

    await request.validate({ schema: createProductSchema })

    try {
      const product = await Product.create({
        title: payload.title,
        description: payload.description,
        slug: payload.slug,
        status: payload.status,
      })

      return product
    } catch (e) {
      return response.badRequest({
        errors: [
          {
            message: e.toString(),
          },
        ],
      })
    }
   }
}
