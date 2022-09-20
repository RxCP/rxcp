import type { APIContext } from 'astro';
import { getUser } from '@astro-auth/core';

export async function get({ params, request }: APIContext) {
  let searchparams = new URL(request.url).searchParams;
  const user = getUser({ server: request });
  const res = await fetch(
    `${
      import.meta.env.PUBLIC_API_URL
    }/admin/api/accounts?${searchparams.toString()}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      },
    },
  );
  return {
    body: JSON.stringify(await res.json()),
  };
}
