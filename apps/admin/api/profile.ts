import { Client } from '@hyper-fetch/core'

export const apiProfile = (client: Client<Error, Partial<XMLHttpRequest>>) => {
  return {
    patchProfile: client.createRequest()({
      method: 'PATCH',
      endpoint: '/api/me',
      auth: true
    })
  }
}
