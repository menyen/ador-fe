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

export function getTermsOfUse() {
  return async (dispatch: Dispatch<ITermsDispatchProps>) => {
    const response = await fetch(`${baseUrl}/api/v1/terms`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuth().token}`,
      },
    }).then((data) => data.json());

    dispatch({ type: IActions.TERMS_FETCHED, terms: response.term });
  };
}

export function setTermsOfUse(text: string) {
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
    }
  };
}
