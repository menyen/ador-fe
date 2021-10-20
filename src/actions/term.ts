import { Dispatch } from 'react';
import { baseUrl, getAuth } from '../utils/loggedUser';

export enum IActions {
  TERMS_FETCHED,
  TERMS_UPDATED,
}

export interface ITermsDispatchProps {
  type: IActions;
  terms: string;
}

export function getTermsOfUse(setAlertMessage: (message: string) => void) {
  return async (dispatch: Dispatch<ITermsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/terms`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: IActions.TERMS_FETCHED, terms: data.term });
    } else {
      setAlertMessage!(data.message);
    }
  };
}

export function setTermsOfUse(
  text: string,
  setAlertMessage: (message: string) => void
) {
  return async (dispatch: Dispatch<ITermsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/terms/1`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      dispatch({ type: IActions.TERMS_UPDATED, terms: text });
    } else {
      const error = await response.json();
      setAlertMessage!(error.message);
    }
  };
}
