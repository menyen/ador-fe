import { Dispatch } from 'react';
import { PatientForm } from '../models/PatientForm';
import api from '../utils/api';
import { getAuth } from '../utils/loggedUser';

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
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IQuestionairesDispatchProps>) =>
    api
      .get(`api/v1/forms/patient/${patient_id}`, {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      })
      .then((response) =>
        dispatch({
          type: IActions.QUESTIONAIRES_FETCHED,
          questionaires: response.data.forms,
        })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}

export function getQuestionairesForPatient(
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IQuestionairesDispatchProps>) =>
    api
      .get('api/v1/forms/patient', {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      })
      .then((response) =>
        dispatch({
          type: IActions.QUESTIONAIRES_FETCHED,
          questionaires: response.data.forms,
        })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}

export function sendQuestionaires(
  patient_id: number,
  forms: string[],
  send_email: boolean,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IQuestionairesDispatchProps>) =>
    api
      .post(
        'api/v1/forms/request',
        JSON.stringify({ patient_id, forms, send_email }),
        {
          headers: {
            Authorization: `Bearer ${getAuth().token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}

export function clearQuestionaires() {
  return async (dispatch: Dispatch<IQuestionairesDispatchProps>) => {
    dispatch({ type: IActions.QUESTIONAIRES_FETCHED, questionaires: [] });
  };
}
