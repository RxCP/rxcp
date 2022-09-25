import { atom, map } from 'nanostores';

export interface AuthUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  remember_me_token?: string;
  accessToken?: string;
}

export const user = map<AuthUser>({});

// Expose only on server side
export const apiToken = atom<string>('');
