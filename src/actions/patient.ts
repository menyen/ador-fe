import { Dispatch } from 'react';
import { PatientPayload } from '../interfaces';
import { Patient } from '../models/Patient';
import api from '../utils/api';
import { getAuth } from '../utils/loggedUser';

export enum IActions {
  PATIENTS_FETCHED,
  // PATIENT_FETCHED,
  PATIENT_CREATED,
  PATIENT_DELETED,
  PATIENT_UPDATED,
}

export interface IPatientsDispatchProps {
  type: IActions;
  patients: Patient[];
}

export function getPatients(setErrorAlert: (message: string) => void) {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) =>
    api
      .get('api/v1/patients', {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      })
      .then((response) =>
        dispatch({
          type: IActions.PATIENTS_FETCHED,
          patients: response.data.patients,
        })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}

export function deletePatient(
  patient: Patient,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) =>
    api
      .delete(`api/v1/patients/${patient.id}`, {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      })
      .then((response) =>
        dispatch({ type: IActions.PATIENT_DELETED, patients: [patient] })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}

export function createPatient(
  patient: PatientPayload,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) =>
    api
      .post('api/v1/patients', JSON.stringify(patient), {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const { patient } = response.data;
        dispatch({ type: IActions.PATIENT_CREATED, patients: [patient] });
        return patient;
      })
      .catch((error) => {
        setErrorAlert!(error.response.data.message);
        return null;
      });
}

export function updatePatient(
  id: number,
  patient: PatientPayload,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) =>
    api
      .put(`api/v1/patients/${id}`, JSON.stringify(patient), {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) =>
        dispatch({
          type: IActions.PATIENT_UPDATED,
          patients: [response.data.patient],
        })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}

export function searchPatients(
  query: string,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) =>
    api
      .get(`api/v1/patients?search=${query}`, {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      })
      .then((response) =>
        dispatch({
          type: IActions.PATIENTS_FETCHED,
          patients: response.data.patients,
        })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}
