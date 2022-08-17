import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run() {
    const gameMasterRole = await Role.findBy('code', 'GAME_MASTER')
    const apiAccountIndex = await Permission.findBy('action', 'api::accounts.index')
    const apiCharIndex = await Permission.findBy('action', 'api::characters.index')
    const apiGuildsIndex = await Permission.findBy('action', 'api::guilds.index')

    await Database.insertQuery()
      .table('permission_role')
      .insert([
        { role_id: gameMasterRole?.id, permission_id: apiAccountIndex?.id },
        { role_id: gameMasterRole?.id, permission_id: apiCharIndex?.id },
        { role_id: gameMasterRole?.id, permission_id: apiGuildsIndex?.id },
      ])
  }
}
