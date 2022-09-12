import { getUser, redirectUser } from '@astro-auth/core';

export function auth(client) {
  const user = getUser({ client });
  if (!user) {
    return redirectUser('/login');
  }
  return user;
}
