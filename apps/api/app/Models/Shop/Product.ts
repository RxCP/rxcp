import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { compose } from '@ioc:Adonis/Core/Helpers'
import ProductFilter from '../Filters/ProductFilter'
import User from '../User'

export default class Product extends compose(BaseModel, Filterable, SoftDeletes) {
  public static $filter = () => ProductFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public slug: string

  @column()
  public price: number

  @column()
  public status: 'draft' | 'published'

  @column({ serializeAs: null })
  public user_id: number

  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id'
  })
  public user: BelongsTo<typeof User>

  @column.dateTime()
  public deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
