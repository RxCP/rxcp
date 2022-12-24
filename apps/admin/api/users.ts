import { DateInterval } from '@better-typed/hyper-fetch'
import { Builder } from '@hyper-fetch/core'

export const apiUsers = (builder: Builder<Error, Partial<XMLHttpRequest>>) => {
  return {
    getUsers: builder.createCommand()({
      method: 'GET',
      endpoint: '/admin/api/users',
      auth: true,
      cache: true,
      cacheTime: DateInterval.second * 10
    })
  }
}
