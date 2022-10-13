import { atom } from 'nanostores';

export const currentPath = atom<string>('');
export const queryParams = atom<Record<string, string>>({});
