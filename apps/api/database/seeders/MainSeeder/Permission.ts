/* eslint-disable import/no-anonymous-default-export */
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class extends BaseSeeder {
  public async run() {
    await Permission.createMany([
      { action: 'api::accounts.index' },
      { action: 'api::accounts.create' },
      { action: 'api::accounts.update' },
      { action: 'api::accounts.delete' },
      { action: 'api::characters.index' },
      { action: 'api::guilds.index' },
      { action: 'api::shop::product.index' },
      { action: 'api::shop::product.create' },
    ])
  }
}
