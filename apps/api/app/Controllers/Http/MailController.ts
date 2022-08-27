import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Mail from '@ioc:Adonis/Addons/Mail'

export default class MailController {
  public async testConnection({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('permission', 'api::mail.testConnection')
    const email = request.input('email')

    try {
      const res = await Mail.use('mailgun').send((message) => {
        message.subject('RxCP - Test Email Connection')
        message.to(email)
        message.from('hello@rxcp.dev')
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
