import { isEmpty } from 'lodash-es'

export default defineNuxtRouteMiddleware((to, from) => {
  const { authUser } = useAuthStore()

  if (!isEmpty(authUser)) {
    return navigateTo('/admin')
  }
})
