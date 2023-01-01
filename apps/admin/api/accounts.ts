import { Client } from '@hyper-fetch/core'

export const apiAccounts = (client: Client<Error, Partial<XMLHttpRequest>>) => {
  return {
    getAccounts: client.createRequest()({
      method: 'GET',
      endpoint: '/admin/api/accounts',
      auth: true
    })
  }
}
