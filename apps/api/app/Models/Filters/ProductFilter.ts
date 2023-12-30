import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Product from '../Shop/Product'
import BasePowerFilter from './BasePowerFilter'

export default class ProductFilter extends BasePowerFilter {
  public $query: ModelQueryBuilderContract<typeof Product, Product>
}
