export async function useLogOut() {
  const { $api } = useNuxtApp()
  const { setAccessToken, setAuthUser } = useAuthStore()
  const router = useRouter()

  setAccessToken('')
  setAuthUser({})

  router.push({ path: '/login' })

  return await $api.auth.logOut.send()
}
