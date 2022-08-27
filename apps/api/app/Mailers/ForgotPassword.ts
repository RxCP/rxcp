import mjml2html from 'mjml'
import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import Config from '@ioc:Adonis/Core/Config'
import User from 'App/Models/User'

export default class ForgotPassword extends BaseMailer {
  constructor(private user: User) {
    super()
  }

  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "ForgotPassword.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public async prepare(message: MessageContract) {
    const html = await View.render('emails/forgot_password', {
      firstName: this.user?.first_name || '{{ firstName }}',
      resetPasswordLink: '#',
      appName: 'RxCP',
    })

    message
      .subject('Forgot Password')
      .from(Config.get('mail.from'))
      .to(this.user?.email || 'user@example.com')
      .html(mjml2html(html).html)
  }
}
