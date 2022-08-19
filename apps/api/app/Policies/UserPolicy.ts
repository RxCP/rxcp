import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async view(user: User) {
    if (await user.related('roles').query().where('code', 'SUPERADMIN').first()) {
      return true
    }

    return false
  }
}
