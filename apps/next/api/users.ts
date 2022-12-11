import { builder } from './builder';

export const getUsers = builder.createCommand()({
  method: 'GET',
  endpoint: '/admin/api/users',
  auth: true
});
