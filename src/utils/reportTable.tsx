import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { HADReportTableColumn, SimpleReportTableColumn } from '../interfaces';
import {
  PatientBasicResult,
  PatientFibromialgiaResult,
  PatientForm,
  PatientHADResult,
} from '../models/PatientForm';

export const simpleColumns: SimpleReportTableColumn[] = [
  { id: 'date', label: 'Data', minWidth: 100 },
  { id: 'result', label: 'Resultado', minWidth: 100 },
  { id: 'details', label: 'Ver resultados', minWidth: 100 },
];

export const hadColumns: HADReportTableColumn[] = [
  { id: 'date', label: 'Data', minWidth: 100 },
  { id: 'result_ansiety', label: 'Resultado para ansiedade', minWidth: 100 },
  { id: 'result_depression', label: 'Resultado para depressão', minWidth: 100 },
  { id: 'details', label: 'Ver resultados', minWidth: 100 },
];

export function setDataIntoSimpleTable(
  data: PatientForm[],
  selectForm: (chosen: PatientForm) => void
) {
  return data.map((form) => {
    return {
      id: form.id,
      date: new Date(form.updated_at).toLocaleDateString(),
      result: (form.results as PatientBasicResult)?.text,
      details: (
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            selectForm(form);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    };
  });
}

export function setDataIntoFibromialgiaTable(
  data: PatientForm[],
  selectForm: (chosen: PatientForm) => void
) {
  return data.map((form) => {
    return {
      id: form.id,
      date: new Date(form.updated_at).toLocaleDateString(),
      result: (form.results as PatientFibromialgiaResult)?.diagnosis?.criteria,
      details: (
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            selectForm(form);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    };
  });
}

export function setDataIntoHADTable(
  data: PatientForm[],
  selectForm: (chosen: PatientForm) => void
) {
  return data.map((form) => {
    return {
      id: form.id,
      date: new Date(form.updated_at).toLocaleDateString(),
      result_ansiety: (form.results as PatientHADResult)?.ansiedade.text,
      result_depression: (form.results as PatientHADResult)?.depressao.text,
      details: (
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            selectForm(form);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    };
  });
}
