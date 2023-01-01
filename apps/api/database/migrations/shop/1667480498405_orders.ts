import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('email', 100).notNullable()
      table.string('currency_code', 10).notNullable()
      table.string('payment_status').notNullable()
      table.integer('total').notNullable()
      table.integer('subtotal').notNullable()
      table.integer('paid_total').notNullable()
      table.integer('coupon').nullable()
      table.integer('discount_total').nullable()
      table.integer('tax_rate').nullable()
      table.integer('tax_total').nullable()
      table.integer('refunded_total').nullable()
      table.integer('refundable_amount').nullable()
      table.string('status').notNullable()
      table.integer('cart_id').notNullable()
      table.integer('customer_id').unsigned().references('users.id').onDelete('cascade')

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
