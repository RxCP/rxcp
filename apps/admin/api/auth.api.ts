import { Client } from '@hyper-fetch/core'

type LoginPayload = {
  email: FormDataEntryValue | string
  password: FormDataEntryValue | string
}

export const apiAuth = (client: Client<Error, Partial<XMLHttpRequest>>) => {
  return {
    postLogin: client.createRequest<ResponseType, LoginPayload>()({
      method: 'POST',
      endpoint: '/api/login',
      auth: false
    }),
    postLogOut: client.createRequest()({
      method: 'POST',
      endpoint: '/api/logout',
      auth: true
    }),
    getAuthUser: client.createRequest()({
      method: 'GET',
      endpoint: '/api/me',
      auth: true
    })
  }
}
