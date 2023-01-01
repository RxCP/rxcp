import { Client } from '@hyper-fetch/core'

export const apiCharacters = (
  client: Client<Error, Partial<XMLHttpRequest>>
) => {
  return {
    getCharacters: client.createRequest()({
      method: 'GET',
      endpoint: '/admin/api/characters',
      auth: true
    })
  }
}
