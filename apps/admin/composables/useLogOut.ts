export async function useLogOut() {
  const { postLogOut } = useApi()
  const { setAccessToken, setAuthUser } = useAuthStore()
  const router = useRouter()

  setAccessToken('')
  setAuthUser({})

  router.push({ path: '/login' })

  return await postLogOut.send()
}
