import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Users from 'App/Models/User'
import BasePowerFilter from './BasePowerFilter'

export default class UsersFilter extends BasePowerFilter {
  public $query: ModelQueryBuilderContract<typeof Users, Users>

  public where(where: object) {
    for (const field in where) {
      if (field === 'or' && typeof where[field] !== 'object') {
        throw new Error('Invalid `or`, must be an array')
      }

      // Check for OR
      if (field === 'or') {
        this.$query.where((query) => {
          // loop using orWhere
          for (const orItem of where['or']) {
            for (const orItemField in orItem) {
              this.toWhere(orItemField, orItem[orItemField], 'or', query)
            }
          }
        })
        return
      }

      // W/o groupings
      // Default is AND
      this.toWhere(field, where[field])
    }
  }

  /**
   * Produced a valid DB queries based from the query params
   *
   * e.g of query params
   * `where[first_name][equals]=john&where[last_name][equals]=baldonado`
   *
   * which will be converted to an object
   *
   * ```
   * where: {
   *   first_name: { equals: 'john' },
   *   last_name: { equals: 'baldonado' }
   * }
   * ```
   *
   * and the final query is
   *```
   * this.$query.where('first_name', 'john)
   * this.$query.where('last_name', 'baldonado)
   * ```
   * Example how to use
   * ```
   * this.toWhere('first_name', { equals: 'john' })
   * ```
   *
   * @param fieldName - the field name to find or filter
   * @param fieldObj  - the object of the field value e.g for first_name the object is { equals: 'john' }
   * @param type - where type could be or || and
   * @param query - the query to use (this.$query or the query from group)
   * @returns {void}
   */
  private toWhere(
    fieldName: string,
    fieldObj: object,
    type: string = 'and',
    query?: ModelQueryBuilderContract<typeof Users, Users>
  ): void {
    const q = query ? query : this.$query
    for (const operator in fieldObj) {
      this.whereType(fieldName, operator, fieldObj[operator], type, q)
    }
  }

  /**
   * Decide which type to query `where` or `orWhere`
   *
   * @param fieldName - the field name to find or filter
   * @param operator - @see `this.operators` for valid value
   * @param value - the value of the field
   * @param type - or || and
   * @param query  - the query to use (this.$query or the query from group)
   * @returns {void}
   */
  private whereType(
    fieldName: string,
    operator: string,
    value: string,
    type: string = 'and',
    query: ModelQueryBuilderContract<typeof Users, Users>
  ): void {
    const validOperator = this.operators[operator]

    if (!validOperator) {
      throw new Error(`'Invalid operator: ${operator}`)
    }

    if (operator === 'like') {
      if (type === 'or') {
        query.orWhere(fieldName, validOperator, `%${value}%`)
        return
      }
      query.where(fieldName, validOperator, `%${value}%`)
      return
    }

    if (type === 'or') {
      query.orWhere(fieldName, validOperator, value)
      return
    }

    query.where(fieldName, validOperator, value)
  }
}
