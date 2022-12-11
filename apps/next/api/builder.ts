import { Builder } from '@hyper-fetch/core';

export const builder = new Builder({ baseUrl: 'http://localhost:3333' }).onAuth(
  (command) => {
    const { accessToken } = useAuthStore();
    // For every authenticated command we want to
    // add the header with token and return the extended command
    return command.setHeaders({
      ...command.headers,
      Authorization: `Bearer ${accessToken}`
    });
  }
);
