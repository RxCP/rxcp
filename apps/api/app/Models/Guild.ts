import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Guild extends BaseModel {
  public static connection = 'ragnarok'
  public static table = 'guild'

  @column({ isPrimary: true })
  public guild_id: number

  @column()
  public name: string

  @column()
  public char_id: number

  @column()
  public master: string

  @column()
  public guild_lv: number

  @column()
  public connect_member: number

  @column()
  public max_member: number

  @column()
  public average_lv: number

  @column()
  public exp: number

  @column()
  public next_exp: number

  @column()
  public skill_point: number

  @column()
  public mes1: string

  @column()
  public mes2: string

  @column()
  public emblem_len: number

  @column()
  public emblem_id: number

  @column()
  public emblem_data: string

  @column()
  public last_master_change: DateTime
}
