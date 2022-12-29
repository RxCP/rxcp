import { Builder } from '@hyper-fetch/core'

export const apiCharacters = (
  builder: Builder<Error, Partial<XMLHttpRequest>>
) => {
  return {
    getCharacters: builder.createCommand()({
      method: 'GET',
      endpoint: '/admin/api/characters',
      auth: true
    })
  }
}
