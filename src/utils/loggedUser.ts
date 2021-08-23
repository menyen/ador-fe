import { RolesEnum } from '../interfaces';
import { UserAuth } from '../models/UserAuth';

export function isValidRole(value: string): value is keyof typeof RolesEnum {
  return value in RolesEnum;
}

export const baseUrl = 'https://api-ador.iponce.com.br';
let auth: UserAuth;
export function getAuth() {
  if (!auth) {
    auth = JSON.parse(localStorage.getItem('auth') || '{}');
  }
  return auth;
}
