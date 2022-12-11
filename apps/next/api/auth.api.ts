import { builder } from './builder';

type LoginPayload = {
  email: FormDataEntryValue | string;
  password: FormDataEntryValue | string;
};

export const login = builder.createCommand<ResponseType, LoginPayload>()({
  method: 'POST',
  endpoint: '/api/login',
  auth: false
});

export const logOut = builder.createCommand()({
  method: 'POST',
  endpoint: '/api/logout',
  auth: true
});

export const getUser = builder.createCommand()({
  method: 'GET',
  endpoint: '/api/me',
  auth: true
});
