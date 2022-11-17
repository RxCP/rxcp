import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { emailRules, firstNameRules, lastNameRules, passwordRules } from 'App/Validations/user'
import cacheData, { purgeCache } from 'App/Services/cacheData'

export default class UsersController {
  private cachePrefix = 'users'

  /**
   * Users list
   */
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.index')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const requestQs = request.qs()
    const qs = JSON.stringify(requestQs)
    const cacheKey = qs !== '{}' ? `${this.cachePrefix}:${qs}` : this.cachePrefix

    return await cacheData(cacheKey)(response)(async () => {
      return await User.query()
        .preload('roles', (query) => {
          query.select('name')
        })
        .filter(requestQs)
        .paginate(page, limit)
    })
  }

  /**
   *User details
   */
  public async show({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.show')

    const data = await cacheData(`${this.cachePrefix}:${params?.id}`)(response)(async () => {
      return await User.find(params?.id)
    })

    return {
      data,
    }
  }

  /**
   * Total users
   */
  public async total({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.total')

    const total = await cacheData(`${this.cachePrefix}:total:${params?.id}`)(response)(async () => {
      const fetchTotal = await User.query().count('*', 'total').first()
      return fetchTotal?.$extras?.total
    }, false)

    return {
      data: {
        total,
      },
    }
  }

  /**
   * Create user
   */
  public async create({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.create')
    const payload = request.only(['first_name', 'last_name', 'email', 'password'])

    // Validation
    const updateUserSchema = schema.create({
      first_name: firstNameRules,
      last_name: lastNameRules,
      email: emailRules(),
      password: passwordRules(),
    })

    await request.validate({ schema: updateUserSchema })

    try {
      const user = await User.create({
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: payload.password,
      })

      // clear cache
      await this.purgeCache()

      return user
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

  /**
   * Update user
   */
  public async update({ request, params, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.update')
    const payload = request.only(['first_name', 'last_name', 'email', 'password'])
    let validationSchema = {
      first_name: firstNameRules,
      last_name: lastNameRules,
      email: emailRules(params?.id),
    }

    if (payload.password) {
      validationSchema = {
        ...validationSchema,
        ...{ password: passwordRules() },
      }
    }

    // Validation
    const updateUserSchema = schema.create(validationSchema)

    await request.validate({ schema: updateUserSchema })

    try {
      const user = await User.findOrFail(params?.id)
      const results = await user
        .merge({
          first_name: payload.first_name,
          last_name: payload.last_name,
          email: payload.email,
          password: payload.password,
        })
        .save()

      // clear cache
      await this.purgeCache()

      return results
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

  /**
   * Archive user
   */
  public async archive({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.destroy')

    try {
      const user = await User.findOrFail(params?.id)
      await user.delete()

      // clear cache
      await this.purgeCache()

      return response.noContent()
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

  /**
   * Restore user from archived
   */
  public async restore({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.restore')
    const payload = request.only(['user_id'])

    try {
      const user = await User.withTrashed().where('id', payload.user_id).firstOrFail()
      await user.restore()

      // clear cache
      await this.purgeCache()

      return user
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

  /**
   * Archived users
   */
  public async archived({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.archived')

    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const requestQs = request.qs()
    const qs = JSON.stringify(requestQs)
    const cacheKey = qs !== '{}' ? `users_archived:${qs}` : 'users_archived:'

    return await cacheData(cacheKey)(response)(async () => {
      return await User.query().onlyTrashed().filter(requestQs).paginate(page, limit)
    })
  }

  /**
   * Permanently delete user
   */
  public async delete({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.delete')

    try {
      const user = await User.withTrashed().where('id', params.id).firstOrFail()
      await user.forceDelete()

      // clear cache
      await this.purgeCache()

      return response.noContent()
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

  /**
   * Clear one user cache
   */
  public async clearOneCache({ response, params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.clearCache')
    await this.purgeCache(params?.id)

    return response.noContent()
  }

  /**
   * Clear users cache
   */
  public async clearAllCache({ bouncer, response }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.clearCache')
    await this.purgeCache()

    return response.noContent()
  }

  /**
   * Clear cache
   */
  private async purgeCache(id?: string) {
    purgeCache(id ? `${this.cachePrefix}:${id}` : `${this.cachePrefix}*`)
  }
}
