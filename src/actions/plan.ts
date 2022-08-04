import { Dispatch } from 'react';
import { Plan } from '../models/Plan';
import api from '../utils/api';
import { getAuth } from '../utils/loggedUser';

export enum IActions {
  PLANS_FETCHED,
}

export interface IPlansDispatchProps {
  type: IActions;
  plans: Plan[];
}

export function getPlans(setErrorAlert: (message: string) => void) {
  return async (dispatch: Dispatch<IPlansDispatchProps>) =>
    api
      .get('api/v1/subscriptions/plans', {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      })
      .then((response) =>
        dispatch({
          type: IActions.PLANS_FETCHED,
          plans: response.data.plans,
        })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}