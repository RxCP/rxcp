import { Client } from '@hyper-fetch/core'

type LoginPayload = {
  email: FormDataEntryValue | string
  password: FormDataEntryValue | string
}

export const apiAuth = (client: Client<Error, Partial<XMLHttpRequest>>) => {
  return {
    login: client.createRequest<ResponseType, LoginPayload>()({
      method: 'POST',
      endpoint: '/api/login',
      auth: false
    }),
    logOut: client.createRequest()({
      method: 'POST',
      endpoint: '/api/logout',
      auth: true
    }),
    getUser: client.createRequest()({
      method: 'GET',
      endpoint: '/api/me',
      auth: true
    })
  }
}
