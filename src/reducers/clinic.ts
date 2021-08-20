import { IActions, IClinicsDispatchProps } from '../actions/clinic';
import { Clinic } from '../models/Clinic';

export default function clinicReducer(
  state: Clinic[],
  action: IClinicsDispatchProps
) {
  const { type } = action;
  switch (type) {
    case IActions.CLINICS_FETCHED:
      return action.clinics;
    case IActions.CLINIC_CREATED:
      return [...state, ...action.clinics];
    case IActions.CLINIC_DELETED:
      return state.filter(
        (clinic: Clinic) => clinic.id !== action.clinics[0].id
      );
    case IActions.CLINIC_UPDATED:
      return state.map((clinic: Clinic) => {
        if (clinic.id === action.clinics[0].id) {
          return action.clinics[0];
        }
        return clinic;
      });
  }
}
