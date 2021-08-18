import { Credentials, ClinicPayload } from '../interfaces';
import { UserAuth } from '../models/UserAuth';

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

export async function getClinics() {
  return fetch(`${baseUrl}/api/v1/clinics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAuth().token}`,
    },
  }).then((data) => data.json());
}

export async function getClinic(id: number) {
  return fetch(`${baseUrl}/api/v1/clinics/${id}`, {
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

export async function updateClinic(id: number, newClinic: ClinicPayload) {
  return fetch(`${baseUrl}/api/v1/clinics/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getAuth().token}`,
      'Content-Type': 'applciation/json',
    },
    body: JSON.stringify(newClinic),
  });
}

export async function getTermsOfUse() {
  return fetch(`${baseUrl}/api/v1/terms`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAuth().token}`,
    },
  }).then((data) => data.json());
}

export async function setTermsOfUse(text: string) {
  return fetch(`${baseUrl}/api/v1/terms/1`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getAuth().token}`,
    },
    body: JSON.stringify({ text }),
  });
}
