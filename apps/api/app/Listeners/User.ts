import { EventsList } from '@ioc:Adonis/Core/Event'
import ForgotPassword from 'App/Mailers/ForgotPassword'
import Logger from '@ioc:Adonis/Core/Logger'

export default class User {
  public async onResetPass({ user, token }: EventsList['user:reset-password']) {
    await new ForgotPassword(user, token).send()
    Logger.info({ id: user?.id }, 'user reset password')
  }
}
