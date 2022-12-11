import { DateInterval } from '@better-typed/hyper-fetch'
import { builder } from './builder'

export const getUsers = builder.createCommand()({
  method: 'GET',
  endpoint: '/admin/api/users',
  auth: true,
  cache: true,
  cacheTime: DateInterval.second * 10
})
