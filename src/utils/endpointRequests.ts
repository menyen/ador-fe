import { Credentials, ClinicPayload, UserAuth } from '../interfaces';

const baseUrl = 'https://api-ador.iponce.com.br';
let auth: UserAuth;
function getAuth() {
  if (!auth) {
    auth = JSON.parse(localStorage.getItem('auth') || '{}');
  }
  return auth;
}

export async function loginUser(credentials: Credentials) {
  return fetch(`${baseUrl}/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'applciation/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export async function getClinicis() {
  return fetch(`${baseUrl}/api/v1/clinics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAuth().token}`,
    },
  }).then((data) => data.json());
}

export async function createClinic(newClinic: ClinicPayload) {
  return fetch(`${baseUrl}/api/v1/clinics`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAuth().token}`,
      'Content-Type': 'applciation/json',
    },
    body: JSON.stringify(newClinic),
  });
}
