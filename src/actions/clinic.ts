import { Dispatch } from 'react';
import { ClinicPayload } from '../interfaces';
import { Clinic } from '../models/Clinic';
import { baseUrl, getAuth } from '../utils/loggedUser';

export enum IActions {
  CLINICS_FETCHED,
  // CLINIC_FETCHED,
  CLINIC_CREATED,
  CLINIC_DELETED,
  CLINIC_UPDATED,
}

export interface IClinicsDispatchProps {
  type: IActions;
  clinics: Clinic[];
}

export function getClinics() {
  return async (dispatch: Dispatch<IClinicsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/clinics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
      },
    }).then((data) => data.json());

    dispatch({ type: IActions.CLINICS_FETCHED, clinics: response.clinics });
  };
}

// export async function getClinic(id: number) {
//   return fetch(`${baseUrl}/api/v1/clinics/${id}`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${getAuth().token}`,
//     },
//   }).then((data) => data.json());
// }

export function deleteClinic(clinic: Clinic) {
  return async (dispatch: Dispatch<IClinicsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/clinics/${clinic.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
      },
    });
    if (response.ok) {
      dispatch({ type: IActions.CLINIC_DELETED, clinics: [clinic] });
    }
  };
}

export function createClinic(clinic: ClinicPayload) {
  return async (dispatch: Dispatch<IClinicsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/clinics`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clinic),
    }).then((data) => data.json());
    dispatch({ type: IActions.CLINIC_CREATED, clinics: [response.clinic] });
  };
}

export function updateClinic(id: number, clinic: ClinicPayload) {
  return async (dispatch: Dispatch<IClinicsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/clinics/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clinic),
    }).then((data) => data.json());

    dispatch({ type: IActions.CLINIC_UPDATED, clinics: [response.clinic] });
  };
}
