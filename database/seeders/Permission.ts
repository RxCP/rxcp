import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class extends BaseSeeder {
  public async run() {
    await Permission.createMany([
      {
        action: 'api::accounts.index',
      },
      {
        action: 'api::accounts.create',
      },
    ])
  }
}
