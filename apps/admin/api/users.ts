import { DateInterval } from '@better-typed/hyper-fetch'
import { Client } from '@hyper-fetch/core'

export const apiUsers = (client: Client<Error, Partial<XMLHttpRequest>>) => {
  return {
    getUsers: client.createRequest()({
      method: 'GET',
      endpoint: '/admin/api/users',
      auth: true,
      cache: true,
      cacheTime: DateInterval.second * 10
    }),
    getUser: client.createRequest()({
      method: 'GET',
      endpoint: '/admin/api/users/:userId',
      auth: true,
      cache: true,
      cacheTime: DateInterval.second * 10
    })
  }
}
