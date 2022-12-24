import { Builder } from '@hyper-fetch/core'

export const apiAccounts = (
  builder: Builder<Error, Partial<XMLHttpRequest>>
) => {
  return {
    getAccounts: builder.createCommand()({
      method: 'GET',
      endpoint: '/admin/api/accounts',
      auth: true
    })
  }
}
