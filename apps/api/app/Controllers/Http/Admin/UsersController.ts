import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { emailRules, firstNameRules, lastNameRules, passwordRules } from 'App/Validations/user'
import cacheData from 'App/Services/cacheData'
import Redis from '@ioc:Adonis/Addons/Redis'

export default class UsersController {
  /**
   * Users list
   */
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::users.index')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const requestQs = request.qs()
    const qs = JSON.stringify(requestQs)
    const cacheKey = qs !== '{}' ? `users:${qs}` : 'users:'

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

    const data = await cacheData(`user:${params?.id}`)(response)(async () => {
      return await User.find(params?.id)
    })

    return {
      data,
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

    this.purgeCache()

    return response.noContent()
  }

  /**
   * Clear cache
   */
  private async purgeCache(id?: string) {
    if (id) {
      await Redis.del(`user:${id}`)
      return
    }

    const stream = Redis.scanStream({ match: 'users:*', count: 100 })
    let pipeline = Redis.pipeline()

    stream.on('data', (keys) => {
      stream.pause()

      for (const key of keys) {
        pipeline.del(key)
      }

      pipeline.exec(() => {
        stream.resume()
      })
    })
  }
}
