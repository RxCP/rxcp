import type { APIContext } from 'astro';
import { apiToken } from '@store/auth';

export async function get({ params, request }: APIContext) {
  let searchparams = new URL(request.url).searchParams;
  const res = await fetch(
    `${
      import.meta.env.PUBLIC_API_URL
    }/admin/api/characters?${searchparams.toString()}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${apiToken.get()}`,
      },
    },
  );
  return {
    body: JSON.stringify(await res.json()),
  };
}
