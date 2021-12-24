import { Dispatch } from 'react';
import { PatientForm } from '../models/PatientForm';
import { baseUrl, getAuth } from '../utils/loggedUser';

export enum IActions {
  QUESTIONAIRES_FETCHED,
  QUESTIONAIRES_SENT,
}

export interface IQuestionairesDispatchProps {
  type: IActions;
  questionaires: PatientForm[];
}

export function getQuestionaires(
  patient_id: number,
  setAlertMessage: (message: string) => void
) {
  return async (dispatch: Dispatch<IQuestionairesDispatchProps>) => {
    const response = await fetch(
      `${baseUrl}/api/v1/forms/patient/${patient_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      setAlertMessage!(data.message);
    } else {
      dispatch({
        type: IActions.QUESTIONAIRES_FETCHED,
        questionaires: data.forms,
      });
    }
  };
}

export function getQuestionairesForPatient(
  setAlertMessage: (message: string) => void
) {
  return async (dispatch: Dispatch<IQuestionairesDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/forms/patient`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      setAlertMessage!(data.message);
    } else {
      dispatch({
        type: IActions.QUESTIONAIRES_FETCHED,
        questionaires: data.forms,
      });
    }
  };
}

export function sendQuestionaires(
  patient_id: number,
  forms: string[],
  send_email: boolean,
  setAlertMessage: (message: string) => void
) {
  return async (dispatch: Dispatch<IQuestionairesDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/forms/request`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patient_id, forms, send_email }),
    });
    if (!response.ok) {
      const error = await response.json();
      setAlertMessage!(error.message);
    }
  };
}

export function clearQuestionaires() {
  return async (dispatch: Dispatch<IQuestionairesDispatchProps>) => {
    dispatch({ type: IActions.QUESTIONAIRES_FETCHED, questionaires: [] });
  };
}
