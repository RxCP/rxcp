import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ accessToken: '', authUser: {} }),
  actions: {
    setAccessToken(newToken: string) {
      this.accessToken = newToken
    },
    setAuthUser(user: object) {
      this.authUser = user
    }
  },
  persist: true
})
