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

export function getQuestionaires(patient_id: number) {
  return async (dispatch: Dispatch<IQuestionairesDispatchProps>) => {
    const response = await fetch(
      `${baseUrl}/api/v1/forms/patient/${patient_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }
    ).then((data) => data.json());

    dispatch({
      type: IActions.QUESTIONAIRES_FETCHED,
      questionaires: response.forms,
    });
  };
}

export function getQuestionairesForPatient() {
  return async (dispatch: Dispatch<IQuestionairesDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/forms/patient`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
      },
    }).then((data) => data.json());

    dispatch({
      type: IActions.QUESTIONAIRES_FETCHED,
      questionaires: response.forms,
    });
  };
}

export function sendQuestionaires(patient_id: number, forms: string[]) {
  return async (dispatch: Dispatch<IQuestionairesDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/forms/request`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patient_id, forms }),
    });
    if (!response.ok) {
      throw new Error('Could not send questionaire list');
    }
  };
}

export function clearQuestionaires() {
  return async (dispatch: Dispatch<IQuestionairesDispatchProps>) => {
    dispatch({ type: IActions.QUESTIONAIRES_FETCHED, questionaires: [] });
  };
}
