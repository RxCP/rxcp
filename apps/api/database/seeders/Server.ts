import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Server from 'App/Models/Server'
import Setting from 'App/Models/Setting'

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends BaseSeeder {
  public async run() {
    const defaultServer = await Server.create({
      name: 'RxCP',
    })

    const loginConf = await Setting.findBy('name', 'login')
    const charConf = await Setting.findBy('name', 'char')
    const mapConf = await Setting.findBy('name', 'map')

    await Database.insertQuery()
      .table('server_setting')
      .insert([
        { server_id: defaultServer?.id, setting_id: loginConf?.id },
        { server_id: defaultServer?.id, setting_id: charConf?.id },
        { server_id: defaultServer?.id, setting_id: mapConf?.id },
      ])
  }
}
