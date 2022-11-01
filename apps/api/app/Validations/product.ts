import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const titleRules = schema.string({ trim: true }, [rules.maxLength(20)])
export const descriptionRules = schema.string({ trim: true }, [rules.maxLength(1000)])
export const slugRules = (id?: number) => {
  let fieldRules = [rules.maxLength(50)]
  if (id) {
    fieldRules.push(rules.unique({ table: 'products', column: 'slug', whereNot: { id } }))
  } else {
    fieldRules.push(rules.unique({ table: 'products', column: 'slug' }))
  }
  return schema.string({ trim: true }, fieldRules)
}
export const statusRules = schema.string({ trim: true }, [rules.maxLength(10)])
