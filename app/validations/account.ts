import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const userIdRules = schema.string({ trim: true }, [
  rules.maxLength(20),
  rules.unique({ connection: 'ragnarok', table: 'login', column: 'userid' }),
])
export const passwordRules = schema.string({ trim: true }, [
  rules.minLength(6),
  rules.maxLength(20),
])
export const genderRules = schema.enum(['M', 'F', 'S'] as const)
export const birthdateRules = schema.date({ format: 'yyyy-MM-dd' })
