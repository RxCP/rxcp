import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'

export default class BasePowerFilter extends BaseModelFilter {
  // Supported operators for now
  public operators = {
    equals: '=',
    not_equals: '!=',
    greater_than: '>',
    greater_than_equal: '>=',
    less_than: '<',
    less_than_equal: '<=',
    like: 'LIKE',
  }
}
