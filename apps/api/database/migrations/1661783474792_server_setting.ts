/* eslint-disable import/no-anonymous-default-export */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'server_setting'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('server_id').unsigned().references('server.id')
      table.integer('setting_id').unsigned().references('settings.id')
      table.unique(['server_id', 'setting_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
