import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Config from '@ioc:Adonis/Core/Config'
import Account from './Account'

export default class Character extends BaseModel {
  public static connection = 'ragnarok'
  public static table = 'char'

  @column({ isPrimary: true })
  public char_id: number

  @column()
  public account_id: number

  @column()
  public char_num: number

  @column()
  public name: string

  @column()
  public class: number

  @column()
  public base_level: number

  @column()
  public job_level: number

  @column()
  public base_exp: number

  @column()
  public job_exp: number

  @column()
  public zeny: number

  @column()
  public str: number

  @column()
  public agi: number

  @column()
  public vit: number

  @column()
  public int: number

  @column()
  public dex: number

  @column()
  public luk: number

  @column()
  public max_hp: number

  @column()
  public hp: number

  @column()
  public max_sp: number

  @column()
  public sp: number

  @column()
  public status_point: number

  @column()
  public skill_point: number

  @column()
  public option: number

  @column()
  public karma: number

  @column()
  public manner: number

  @column()
  public party_id: number

  @column()
  public guild_id: number

  @column()
  public pet_id: number

  @column()
  public homun_id: number

  @column()
  public elemental_id: number

  @column()
  public hair: number

  @column()
  public hair_color: number

  @column()
  public clothes_color: number

  @column()
  public body: number

  @column()
  public weapon: number

  @column()
  public shield: number

  @column()
  public head_top: number

  @column()
  public head_mid: number

  @column()
  public head_bottom: number

  @column()
  public robe: number

  @column()
  public last_map: string

  @column()
  public last_x: number

  @column()
  public last_y: number

  @column()
  public save_map: string

  @column()
  public save_x: number

  @column()
  public save_y: number

  @column()
  public partner_id: number

  @column()
  public online: number

  @column()
  public father: number

  @column()
  public mother: number

  @column()
  public child: number

  @column()
  public fame: number

  @column()
  public rename: number

  @column()
  public delete_date: number

  @column()
  public moves: number

  @column()
  public unban_time: number

  @column()
  public font: number

  @column()
  public uniqueitem_counter: number

  @column()
  public sex: string

  @column()
  public hotkey_rowshift: number

  @column()
  public clan_id: number

  @column()
  public last_login: number

  @column()
  public title_id: number

  @column()
  public show_equip: number

  @computed()
  public get class_name() {
    return Config.get('ragnarok.jobs')[this.class] || ''
  }

  @belongsTo(() => Account, {
    foreignKey: 'account_id',
  })
  public account: BelongsTo<typeof Account>
}
