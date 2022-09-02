import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Role from './Role'
import Account from './Account'

export default class User extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column({ serializeAs: null })
  public resetPasswordToken?: string

  @column({ serializeAs: null })
  public confirmationToken?: string

  @column()
  public confirmed?: number

  @column()
  public blocked?: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime | null

  @manyToMany(() => Role, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
    pivotTable: 'users_roles',
  })
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Account, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'account_id',
    pivotRelatedForeignKey: 'account_id',
    pivotTable: 'users_accounts',
  })
  public accounts: ManyToMany<typeof Account>

  @beforeSave()
  public static async hashPassword(users: User) {
    if (users?.$dirty.password) {
      users.password = await Hash.make(users.password)
    }
  }
}
