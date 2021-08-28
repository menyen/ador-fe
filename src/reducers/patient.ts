import { IActions, IPatientsDispatchProps } from '../actions/patient';
import { Patient } from '../models/Patient';

export default function patientReducer(
  state: Patient[],
  action: IPatientsDispatchProps
) {
  const { type } = action;
  switch (type) {
    case IActions.PATIENTS_FETCHED:
      return action.patients;
    case IActions.PATIENT_CREATED:
      return [...state, ...action.patients];
    case IActions.PATIENT_DELETED:
      return state.filter(
        (patient: Patient) => patient.id !== action.patients[0].id
      );
    case IActions.PATIENT_UPDATED:
      return state.map((patient: Patient) => {
        if (patient.id === action.patients[0].id) {
          return action.patients[0];
        }
        return patient;
      });
  }
}
