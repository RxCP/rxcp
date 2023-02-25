import Drive from '@ioc:Adonis/Core/Drive'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UploadsController {
  /**
   * Upload single binary file
   */
  public async uploadOne({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::upload.uploadOne')
    const category = request.input('category') || './'

    const file = request.file('file', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })

    if (!file) {
      return response.badRequest({
        errors: [
          {
            message: 'Invalid file',
          },
        ],
      })
    }

    if (!file.isValid) {
      return response.badRequest({
        errors: [
          {
            message: file.errors,
          },
        ],
      })
    }

    await file.moveToDisk(category, { visibility: 'public' })
    const url = await Drive.getUrl(`${category}/${file?.fileName}` || '')

    return {
      data: {
        url,
      },
    }
  }
}
