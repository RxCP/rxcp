import { Client, RequestInstance } from '@hyper-fetch/core'
import { apiAuth } from '~/api/auth.api'
import { apiProfile } from '~/api/profile'

export default function () {
  const config = useRuntimeConfig()
  const { accessToken } = useAuthStore()

  const client = new Client({ url: config.public.apiUrl }).onAuth(
    (command: RequestInstance) => {
      // For every authenticated command we want to
      // add the header with token and return the extended command
      return command.setHeaders({
        ...command.headers,
        Authorization: `Bearer ${accessToken}`
      })
    }
  )

  return {
    ...apiAuth(client),
    ...apiProfile(client)
  }
}
