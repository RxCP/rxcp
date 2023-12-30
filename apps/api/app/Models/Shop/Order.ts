import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customer: object

  @column()
  public cart: object

  @column()
  public payments: object

  @column()
  public payment_status: string

  @column()
  public total: number

  @column()
  public subtotal: number

  @column()
  public paid_total: number

  @column()
  public discount_total: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
