import { IActions, IQuestionairesDispatchProps } from '../actions/questionaire';

export default function questionaireReducer(
  state: string[],
  action: IQuestionairesDispatchProps
) {
  const { type } = action;
  switch (type) {
    case IActions.QUESTIONAIRES_FETCHED:
      return action.questionaires;
    case IActions.QUESTIONAIRES_SENT:
      return action.questionaires;
  }
}
