import type { APIContext } from 'astro';
import { apiToken } from '@store/auth';

export async function get({ params, request }: APIContext) {
  let searchparams = new URL(request.url).searchParams;
  return await fetch(
    `${
      import.meta.env.PUBLIC_API_URL
    }/admin/api/users?${searchparams.toString()}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${apiToken.get()}`,
      },
    },
  );
}
