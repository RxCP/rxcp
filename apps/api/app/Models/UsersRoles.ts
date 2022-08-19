import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UsersRoles extends BaseModel {
  @column()
  public user_id: number

  @column()
  public role_id: number
}
