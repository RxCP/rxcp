export async function get(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body?.errors[0].message);
  }

  return body;
}
