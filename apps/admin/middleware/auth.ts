import { filter, isEmpty } from 'lodash-es'

export default defineNuxtRouteMiddleware((to, from) => {
  const { authUser } = useAuthStore()
  const user = filter(authUser.roles, (item) => {
    return item.code === 'SUPERADMIN'
  })

  if (isEmpty(authUser)) {
    return navigateTo('/login')
  }

  if (isEmpty(user)) {
    return navigateTo('/access-denied')
  }
})
