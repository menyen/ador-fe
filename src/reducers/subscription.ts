import { IActions, ISubscriptionsDispatchProps } from '../actions/subscription';

export default function subscriptionReducer(
  state: null,
  action: ISubscriptionsDispatchProps
) {
  const { type } = action;
  switch (type) {
    case IActions.SUBSCRIPTION_UPDATED:
      return action.subscriptions
  }
}
