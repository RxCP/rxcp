import AstroAuth from '@astro-auth/core';
import { CredentialProvider } from '@astro-auth/providers';
import { apiToken, user as userAuth } from '@store/auth';

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

          // Save data to store (server)
          apiToken.set(login.token);
          userAuth.set(user.data);

          return user.data;
        }

        return null;
      },
    }),
  ],
});
