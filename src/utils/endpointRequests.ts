import { Credentials } from '../interfaces';
import { UserAuth } from '../models/UserAuth';

export const baseUrl = 'https://api-ador.iponce.com.br';
let auth: UserAuth;
export function getAuth() {
  if (!auth) {
    auth = JSON.parse(localStorage.getItem('auth') || '{}');
  }
  return auth;
}

export async function loginUser(credentials: Credentials) {
  return fetch(`${baseUrl}/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
