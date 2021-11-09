import { IActions, IReportsDispatchProps } from '../actions/report';
import { PatientForm } from '../models/PatientForm';

export default function questionaireReducer(
  state: PatientForm[],
  action: IReportsDispatchProps
) {
  const { type } = action;
  switch (type) {
    case IActions.REPORTS_FETCHED:
      return action.reports;
  }
}
