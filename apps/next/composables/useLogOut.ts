import { logOut } from '~~/api/auth.api';

export async function useLogOut() {
  const { setAccessToken, setAuthUser } = useAuthStore();
  const router = useRouter();

  setAccessToken('');
  setAuthUser({});

  router.push({ path: '/login' });

  return await logOut.send();
}
