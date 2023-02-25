import { apiProfile } from '~/api/profile'
import { Client, RequestInstance } from '@hyper-fetch/core'
import { apiAccounts } from '~/api/accounts'
import { apiAuth } from '~/api/auth.api'
import { apiCharacters } from '~/api/characters'
import { apiUsers } from '~/api/users'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const client = new Client({ url: config.public.apiUrl }).onAuth(
    (command: RequestInstance) => {
      const { accessToken } = useAuthStore()
      // For every authenticated command we want to
      // add the header with token and return the extended command
      return command.setHeaders({
        ...command.headers,
        Authorization: `Bearer ${accessToken}`
      })
    }
  )

  return {
    provide: {
      api: {
        accounts: apiAccounts(client),
        users: apiUsers(client),
        characters: apiCharacters(client)
      }
    }
  }
})
