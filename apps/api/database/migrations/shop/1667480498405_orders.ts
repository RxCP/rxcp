import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.json('customer')
      table.json('cart')
      table.json('payments')
      table.string('payment_status', 10).notNullable()
      table.integer('total').notNullable()
      table.integer('subtotal').notNullable()
      table.integer('paid_total').notNullable()
      table.integer('discount_total').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('canceled_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
