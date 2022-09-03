import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const userIdRules = schema.string({ trim: true }, [
  rules.maxLength(20),
  rules.unique({ connection: 'ragnarok', table: 'login', column: 'userid' }),
])
export const userIdUpdateRules = (id: number) => {
  return schema.string({ trim: true }, [
    rules.maxLength(20),
    rules.unique({
      connection: 'ragnarok',
      table: 'login',
      column: 'userid',
      whereNot: { account_id: id },
    }),
  ])
}
export const genderRules = schema.enum(['M', 'F', 'S'] as const)
export const birthdateRules = schema.date({ format: 'yyyy-MM-dd' })
