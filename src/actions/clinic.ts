import { Dispatch } from 'react';
import { ClinicPayload } from '../interfaces';
import { Clinic } from '../models/Clinic';
import api from '../utils/api';
import { getAuth } from '../utils/loggedUser';

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

export function getClinics(setErrorAlert: (message: string) => void) {
  return async (dispatch: Dispatch<IClinicsDispatchProps>) =>
    api
      .get('api/v1/clinics', {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      })
      .then((response) =>
        dispatch({
          type: IActions.CLINICS_FETCHED,
          clinics: response.data.clinics,
        })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}

// export async function getClinic(id: number) {
//   return fetch(`${baseUrl}/api/v1/clinics/${id}`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${getAuth().token}`,
//     },
//   }).then((data) => data.json());
// }

export function deleteClinic(
  clinic: Clinic,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IClinicsDispatchProps>) =>
    api
      .delete(`api/v1/clinics/${clinic.id}`, {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      })
      .then((response) =>
        dispatch({ type: IActions.CLINIC_DELETED, clinics: [clinic] })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}

export function createClinic(
  clinic: ClinicPayload,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IClinicsDispatchProps>) =>
    api
      .post('api/v1/clinics', JSON.stringify(clinic), {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) =>
        dispatch({
          type: IActions.CLINIC_CREATED,
          clinics: [response.data.clinic],
        })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}

export function updateClinic(
  id: number,
  clinic: ClinicPayload,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IClinicsDispatchProps>) =>
    api
      .put(`api/v1/clinics/${id}`, JSON.stringify(clinic), {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) =>
        dispatch({
          type: IActions.CLINIC_UPDATED,
          clinics: [response.data.clinic],
        })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}
