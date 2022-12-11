import { builder } from './builder'

export const getAccounts = builder.createCommand()({
  method: 'GET',
  endpoint: '/admin/api/accounts',
  auth: true
})
