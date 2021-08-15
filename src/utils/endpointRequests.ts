import { Credentials, ClinicPayload } from '../interfaces';

export async function loginUser(credentials: Credentials) {
  return fetch('https://api-ador.iponce.com.br/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'applciation/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export async function getClinicis() {
  const tokenString = localStorage.getItem('auth') || '{}';
  const auth = JSON.parse(tokenString);
  return fetch('https://api-ador.iponce.com.br/api/v1/clinics', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  }).then((data) => data.json());
}

export async function createClinic(newClinic: ClinicPayload) {
  const tokenString = localStorage.getItem('auth') || '{}';
  const auth = JSON.parse(tokenString);
  return fetch('https://api-ador.iponce.com.br/api/v1/clinics', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth.token}`,
      'Content-Type': 'applciation/json',
    },
    body: JSON.stringify(newClinic),
  });
}
