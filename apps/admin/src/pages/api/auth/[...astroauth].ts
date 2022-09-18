import AstroAuth from '@astro-auth/core';
import { CredentialProvider } from '@astro-auth/providers';

export const all = AstroAuth({
  authProviders: [
    CredentialProvider({
      authorize: async (properties) => {
        const login = new FormData();
        login.append('email', properties.email);
        login.append('password', properties.password);

        const fetchLogin = await fetch(
          `${import.meta.env.PUBLIC_API_URL}/api/login`,
          {
            method: 'post',
            body: login,
          },
        );

        if (fetchLogin.ok) {
          const login = await fetchLogin.json();
          const fetchUser = await fetch(
            `${import.meta.env.PUBLIC_API_URL}/api/me`,
            {
              headers: {
                Authorization: `Bearer ${login.token}`,
              },
            },
          );
          const user = await fetchUser.json();
          return {
            ...user.data,
            ...{
              accessToken: login.token,
              tokenExpiresAt: user.expires_at,
            },
          };
        }

        return null;
      },
    }),
  ],
});
