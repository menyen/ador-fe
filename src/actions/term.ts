import { Dispatch } from 'react';
import api from '../utils/api';
import { getAuth } from '../utils/loggedUser';

export enum IActions {
  TERMS_FETCHED,
  TERMS_UPDATED,
}

export interface ITermsDispatchProps {
  type: IActions;
  terms: string;
}

export function getTermsOfUse(setErrorAlert: (message: string) => void) {
  return async (dispatch: Dispatch<ITermsDispatchProps>) => {
    api
      .get('api/v1/terms', {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      })
      .then((response) =>
        dispatch({ type: IActions.TERMS_FETCHED, terms: response.data.term })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
  };
}

export function setTermsOfUse(
  text: string,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<ITermsDispatchProps>) => {
    api
      .put('api/v1/terms/1', JSON.stringify({ text }), {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) =>
        dispatch({ type: IActions.TERMS_UPDATED, terms: text })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
  };
}
