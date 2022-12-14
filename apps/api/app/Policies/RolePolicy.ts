import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class RolePolicy extends BasePolicy {
  public async before(user: User | null) {
    if (await user?.related('roles').query().where('code', 'SUPERADMIN').first()) {
      return true
    }
  }

  public async permission(user: User, action: string = '') {
    const userPermissions = await user
      .related('roles')
      .query()
      .preload('permissions', (permissionQuery) => {
        permissionQuery.where('action', action)
      })
      .first()

    if (userPermissions?.permissions && userPermissions?.permissions.length >= 1) {
      return true
    }

    return false
  }
}
