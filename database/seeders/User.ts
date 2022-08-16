import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        first_name: 'Super',
        last_name: 'Admin',
        email: 'admin@rxcp.com',
        password: 'admin',
      },
      {
        first_name: 'John Gerome',
        last_name: 'Baldonado',
        email: 'player@rxcp.com',
        password: 'player',
      },
    ])
  }
}
