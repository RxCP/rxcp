import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const firstNameRules = schema.string({ trim: true }, [rules.maxLength(20)])
export const lastNameRules = schema.string({ trim: true }, [rules.maxLength(20)])
export const emailRules = (id?: number) => {
  return schema.string({ trim: true }, [
    rules.maxLength(30),
    rules.email(),
    rules.unique({ table: 'users', column: 'email', whereNot: { id } }),
  ])
}
export const passwordRules = (passConfirm = 'password_confirmation') => {
  return schema.string({ trim: true }, [
    rules.minLength(6),
    rules.maxLength(20),
    rules.confirmed(passConfirm),
  ])
}
