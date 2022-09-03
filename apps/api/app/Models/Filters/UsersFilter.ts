import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Users from 'App/Models/User'
import BasePowerFilter from './BasePowerFilter'

export default class UsersFilter extends BasePowerFilter {
  public $query: ModelQueryBuilderContract<typeof Users, Users>
}
