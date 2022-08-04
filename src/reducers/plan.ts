import { IActions, IPlansDispatchProps } from '../actions/plan';
import { Plan } from '../models/Plan';

export default function planReducer(
  state: Plan[],
  action: IPlansDispatchProps
) {
  const { type } = action;
  switch (type) {
    case IActions.PLANS_FETCHED:
      return action.plans;
  }
}
