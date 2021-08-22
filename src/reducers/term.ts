import { IActions, ITermsDispatchProps } from '../actions/term';

export default function termsReducer(
  state: string,
  action: ITermsDispatchProps
) {
  const { type } = action;
  switch (type) {
    case IActions.TERMS_FETCHED:
      return action.terms;
    case IActions.TERMS_UPDATED:
      return action.terms;
  }
}
