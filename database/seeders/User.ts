import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        email: 'admin@rxcp.com',
        password: 'admin',
      },
      {
        email: 'johngerome@gmail.com',
        password: '@DMIN',
      },
    ])
  }
}
