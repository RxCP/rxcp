import type { APIContext } from 'astro';
import { apiToken } from '@store/auth';

export async function get({ params, request }: APIContext) {
  return await fetch(`${import.meta.env.PUBLIC_API_URL}/api/me`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${apiToken.get()}`,
    },
  });
}

export async function patch({ params, request }: APIContext) {
  return await fetch(`${import.meta.env.PUBLIC_API_URL}/api/me`, {
    method: 'PATCH',
    body: request.body,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${apiToken.get()}`,
    },
  });
}
