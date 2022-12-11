import { isEmpty } from 'ramda'

export default defineNuxtRouteMiddleware((to, from) => {
  const { authUser } = useAuthStore()

  if (isEmpty(authUser)) {
    return navigateTo('/login')
  }
})
