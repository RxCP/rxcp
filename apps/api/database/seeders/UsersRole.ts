import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import UsersRoles from 'App/Models/UsersRoles'

export default class extends BaseSeeder {
  public async run() {
    // Set Super Admin role
    const admin = await User.findBy('email', 'admin@rxcp.com')
    const adminRole = await Role.findBy('code', 'SUPERADMIN')

    const player = await User.findBy('email', 'player@rxcp.com')
    const playerRole = await Role.findBy('code', 'PLAYER')

    const gameMaster = await User.findBy('email', 'gm@rxcp.com')
    const gameMasterRole = await Role.findBy('code', 'GAME_MASTER')

    await UsersRoles.createMany([
      {
        user_id: admin?.id,
        role_id: adminRole?.id,
      },
      {
        user_id: player?.id,
        role_id: playerRole?.id,
      },
      {
        user_id: gameMaster?.id,
        role_id: gameMasterRole?.id,
      },
    ])
  }
}
