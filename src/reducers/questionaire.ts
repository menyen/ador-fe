import { IActions, IQuestionairesDispatchProps } from '../actions/questionaire';
import { PatientForm } from '../models/PatientForm';

export default function questionaireReducer(
  state: PatientForm[],
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
