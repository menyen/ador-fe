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

export function getPatients(setErrorAlert: (message: string) => void) {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/patients`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: IActions.PATIENTS_FETCHED, patients: data.patients });
    } else {
      setErrorAlert!(data.message);
    }
  };
}

export function deletePatient(
  patient: Patient,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/patients/${patient.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
      },
    });
    if (response.ok) {
      dispatch({ type: IActions.PATIENT_DELETED, patients: [patient] });
    } else {
      const error = await response.json();
      setErrorAlert!(error.message);
    }
  };
}

export function createPatient(
  patient: PatientPayload,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/patients`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: IActions.PATIENT_CREATED, patients: [data.patient] });
      return data.patient;
    } else {
      setErrorAlert!(data.message);
      return null;
    }
  };
}

export function updatePatient(
  id: number,
  patient: PatientPayload,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/patients/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    });
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: IActions.PATIENT_UPDATED, patients: [data.patient] });
    } else {
      setErrorAlert!(data.message);
    }
  };
}

export function searchPatients(
  query: string,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IPatientsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/patients?search=${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: IActions.PATIENTS_FETCHED, patients: data.patients });
    } else {
      setErrorAlert!(data.message);
    }
  };
}
