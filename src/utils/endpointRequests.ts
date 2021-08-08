import { Credentials } from '../interfaces';

export async function loginUser(credentials: Credentials) {
  return fetch('https://api-ador.iponce.com.br/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'applciation/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
