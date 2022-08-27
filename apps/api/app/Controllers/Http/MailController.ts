import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from '@ioc:Adonis/Core/Config'

import Mail from '@ioc:Adonis/Addons/Mail'

export default class MailController {
  public async testConnection({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::mail.testConnection')
    const email = request.input('email')

    try {
      const res = await Mail.send((message) => {
        message.subject('RxCP - Test Email Connection')
        message.to(email)
        message.from(Config.get('mail.from'))
      })
      return res
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
