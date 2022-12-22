import { Builder } from '@hyper-fetch/core'

type LoginPayload = {
  email: FormDataEntryValue | string
  password: FormDataEntryValue | string
}

export const apiAuth = (builder: Builder<Error, Partial<XMLHttpRequest>>) => {
  return {
    login: builder.createCommand<ResponseType, LoginPayload>()({
      method: 'POST',
      endpoint: '/api/login',
      auth: false
    }),
    logOut: builder.createCommand()({
      method: 'POST',
      endpoint: '/api/logout',
      auth: true
    }),
    getUser: builder.createCommand()({
      method: 'GET',
      endpoint: '/api/me',
      auth: true
    })
  }
}
