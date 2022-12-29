import { Builder, CommandInstance } from '@hyper-fetch/core'
import { apiAccounts } from '~~/api/accounts'
import { apiAuth } from '~~/api/auth.api'
import { apiCharacters } from '~~/api/characters'
import { apiUsers } from '~~/api/users'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const builder = new Builder({ url: config.public.apiUrl }).onAuth(
    (command: CommandInstance) => {
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
        auth: apiAuth(builder),
        accounts: apiAccounts(builder),
        users: apiUsers(builder),
        characters: apiCharacters(builder)
      }
    }
  }
})
