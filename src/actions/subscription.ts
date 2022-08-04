import { Dispatch } from 'react';
import { SubscriptionPayload } from '../interfaces';
import api from '../utils/api';
import { getAuth } from '../utils/loggedUser';

export enum IActions {
  SUBSCRIPTION_UPDATED,
}

export interface ISubscriptionsDispatchProps {
  type: IActions;
  subscriptions: null;
}

export function updateSubscription(
  id: number,
  subscription: SubscriptionPayload,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<ISubscriptionsDispatchProps>) =>
    api
      .put(`api/v1/subscriptions/${id}`, JSON.stringify(subscription), {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) =>
        dispatch({
          type: IActions.SUBSCRIPTION_UPDATED,
          subscriptions: null
        })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
}
