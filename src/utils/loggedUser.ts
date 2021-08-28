import { createContext } from 'react';
import { RolesEnum } from '../interfaces';
import { UserAuth } from '../models/UserAuth';

export function isValidRole(value?: string): value is keyof typeof RolesEnum {
  return value ? value in RolesEnum : false;
}

export const baseUrl = 'https://api-ador.iponce.com.br';

export const AuthContext = createContext<
  [token: UserAuth, saveToken: (userToken?: UserAuth) => void]
>([{ token: '' }, () => {}]);

export function getAuth() {
  return JSON.parse(localStorage.getItem('auth') || '{}');
}
