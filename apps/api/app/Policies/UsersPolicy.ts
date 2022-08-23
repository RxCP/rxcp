import User from 'App/Models/User'
import RolePolicy from './RolePolicy'

export default class UsersPolicy extends RolePolicy {
  public async view(user: User) {
    // Check permission by roles
    if (await this.hasPermission(user, 'api::users.index')) {
      return true
    }

    return false
  }

  public async show(user: User) {
    // Check permission by roles
    if (await this.hasPermission(user, 'api::users.find')) {
      return true
    }

    return false
  }
}
