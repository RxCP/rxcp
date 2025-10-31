/* eslint-disable import/no-anonymous-default-export */
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Setting from 'App/Models/Setting'

export default class extends BaseSeeder {
  public async run() {
    await Setting.createMany([
      {
        name: 'login',
        value: JSON.stringify({
          host: '127.0.0.1',
          port: '6900',
        }),
      },
      {
        name: 'char',
        value: JSON.stringify({
          host: '127.0.0.1',
          port: '6900',
        }),
      },
      {
        name: 'map',
        value: JSON.stringify({
          host: '127.0.0.1',
          port: '6900',
        }),
      },
      // Product settings
      {
        name: 'shop_currency',
        value: JSON.stringify({
          symbol: '$',
          name: 'United States Dollar',
          abbreviation: 'USD',
        }),
      },
    ])
  }
}
