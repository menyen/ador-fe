import { Dispatch } from 'react';
import { ReportsSearchPayload } from '../interfaces';
import { PatientForm } from '../models/PatientForm';
import api from '../utils/api';
import { getAuth } from '../utils/loggedUser';

export enum IActions {
  REPORTS_FETCHED,
}

export interface IReportsDispatchProps {
  type: IActions;
  reports: PatientForm[];
}

export function getReports(
  patient_id: number,
  start_date: string,
  end_date: string,
  type: string,
  result: string,
  setErrorAlert: (message: string) => void
) {
  return async (dispatch: Dispatch<IReportsDispatchProps>) => {
    let urlParamObject: ReportsSearchPayload = {
      patient_id: patient_id.toString(),
      start_date,
      end_date,
      type,
    };
    if (type === 'HAD_DEPRESSION') {
      urlParamObject = {
        ...urlParamObject,
        type: 'HAD',
        had_depression: result,
      };
    } else if (type === 'HAD_ANXIETY') {
      urlParamObject = { ...urlParamObject, type: 'HAD', had_anxiety: result };
    } else {
      urlParamObject = { ...urlParamObject, result };
    }
    api
      .get('api/v1/reports', {
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        params: urlParamObject,
      })
      .then((response) =>
        dispatch({
          type: IActions.REPORTS_FETCHED,
          reports: response.data.forms,
        })
      )
      .catch((error) => setErrorAlert!(error.response.data.message));
  };
}

export function clearReports() {
  return async (dispatch: Dispatch<IReportsDispatchProps>) => {
    dispatch({ type: IActions.REPORTS_FETCHED, reports: [] });
  };
}
