import { Dispatch } from 'react';
import { PatientPayload } from '../interfaces';
import { Patient } from '../models/Patient';
import { baseUrl, getAuth } from '../utils/loggedUser';

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

export function getPatients() {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/patients`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
      },
    }).then((data) => data.json());

    dispatch({ type: IActions.PATIENTS_FETCHED, patients: response.patients });
  };
}

export function deletePatient(patient: Patient) {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/patients/${patient.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
      },
    });
    if (response.ok) {
      dispatch({ type: IActions.PATIENT_DELETED, patients: [patient] });
    }
  };
}

export function createPatient(patient: PatientPayload) {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/patients`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    }).then((data) => data.json());
    dispatch({ type: IActions.PATIENT_CREATED, patients: [response.patient] });
  };
}

export function updatePatient(id: number, patient: PatientPayload) {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/patients/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    }).then((data) => data.json());

    dispatch({ type: IActions.PATIENT_UPDATED, patients: [response.patient] });
  };
}
