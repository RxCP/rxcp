import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeDelete,
  beforeFetch,
  beforeFind,
  column,
  hasMany,
  HasMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import Character from './Character'

type AccountQuery = ModelQueryBuilderContract<typeof Account>

// The login table
export default class Account extends BaseModel {
  public static connection = 'ragnarok'
  public static table = 'login'

  @column({ isPrimary: true })
  public account_id: number

  @column()
  public userid: string

  @column({ serializeAs: null })
  public user_pass

  @column()
  public sex: string

  @column()
  public email: string

  @column()
  public group_id: number

  @column()
  public state: number

  @column()
  public unban_time: number

  @column()
  public expiration_time: number

  @column()
  public logincount: number

  @column()
  public lastlogin: DateTime

  @column()
  public last_ip: string

  @column()
  public birthdate: Date

  @column()
  public character_slots: number

  @column({ serializeAs: null })
  public pincode: string

  @column()
  public pincode_change: number

  @column()
  public vip_time: number

  @column()
  public old_group: number

  @hasMany(() => Character, {
    foreignKey: 'account_id',
  })
  public characters: HasMany<typeof Character>

  @beforeFetch()
  public static withoutServerAccounts(query: AccountQuery) {
    query.where('account_id', '!=', '1')
  }

  @beforeFind()
  public static withoutServerAccount(query: AccountQuery) {
    query.where('account_id', '!=', '1')
  }

  @beforeDelete()
  public static async dontRemoveServerAccount(query: AccountQuery) {
    query.where('account_id', '!=', '1')
  }
}
