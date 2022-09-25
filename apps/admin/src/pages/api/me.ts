import type { APIContext } from 'astro';
import { apiToken } from '@store/auth';

export async function get({ params, request }: APIContext) {
  const res = await fetch(`${import.meta.env.PUBLIC_API_URL}/api/me`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${apiToken.get()}`,
    },
  });
  const userAuth = await res.json();
  return {
    body: JSON.stringify(userAuth),
  };
}

export async function patch({ params, request }: APIContext) {
  const res = await fetch(`${import.meta.env.PUBLIC_API_URL}/api/me`, {
    method: 'PATCH',
    body: request.body,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${apiToken.get()}`,
    },
  });
  const updatedUser = await res.json();
  // update authUser data
  // user.get(updatedUser);
  return {
    body: JSON.stringify(await res.json()),
  };
}
