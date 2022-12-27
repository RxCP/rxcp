import { defineStore } from 'pinia'

type Roles = {
  code: string
  id: string
}

type authUser = {
  id: string
  first_name: string
  last_name: string
  email: string
  confirmed: string
  blocked: string
  deleted_at: string
  created_at: string
  updated_at: string
  roles: Roles[]
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '' as string,
    authUser: ({} as authUser) || {}
  }),
  actions: {
    setAccessToken(newToken: string) {
      this.accessToken = newToken
    },
    setAuthUser(user: authUser) {
      this.authUser = user
    }
  },
  persist: true
})
