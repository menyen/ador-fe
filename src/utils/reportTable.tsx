import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  AOFASReportTableColumn,
  HADReportTableColumn,
  SimpleReportTableColumn,
  SPADIReportTableColumn,
} from '../interfaces';
import {
  PatientAOFASResult,
  PatientBasicResult,
  PatientFibromialgiaResult,
  PatientForm,
  PatientHADResult,
  PatientSPADIResult,
  PatientWOMACResult,
} from '../models/PatientForm';

export const simpleColumns: SimpleReportTableColumn[] = [
  { id: 'date', label: 'Data', minWidth: 50 },
  { id: 'result', label: 'Resultado', minWidth: 100, hideForSmallScreen: true },
  { id: 'patient', label: 'Paciente', minWidth: 100 },
  { id: 'details', label: 'Resultados', minWidth: 20 },
];

export const noResultColumns: SimpleReportTableColumn[] = [
  { id: 'date', label: 'Data', minWidth: 50 },
  { id: 'patient', label: 'Paciente', minWidth: 100 },
  { id: 'details', label: 'Resultados', minWidth: 20 },
];

export const allResultsColumns: SimpleReportTableColumn[] = [
  { id: 'date', label: 'Data', minWidth: 50 },
  { id: 'patient', label: 'Paciente', minWidth: 100 },
  { id: 'type', label: 'Formulário', minWidth: 100 },
  { id: 'details', label: 'Resultados', minWidth: 20 },
];

export const hadColumns: HADReportTableColumn[] = [
  { id: 'date', label: 'Data', minWidth: 50 },
  { id: 'result_anxiety', label: 'Resultado para ansiedade', minWidth: 100, hideForSmallScreen: true },
  { id: 'result_depression', label: 'Resultado para depressão', minWidth: 100, hideForSmallScreen: true },
  { id: 'patient', label: 'Paciente', minWidth: 100 },
  { id: 'details', label: 'Resultados', minWidth: 20 },
];

export const spadiColumns: SPADIReportTableColumn[] = [
  { id: 'date', label: 'Data', minWidth: 50 },
  {
    id: 'result_disability',
    label: 'Resultado de incapacidade',
    minWidth: 100,
    hideForSmallScreen: true
  },
  { id: 'result_pain', label: 'Resultado de dor', minWidth: 100, hideForSmallScreen: true },
  { id: 'result_total', label: 'Resultado total', minWidth: 100, hideForSmallScreen: true },
  { id: 'patient', label: 'Paciente', minWidth: 100 },
  { id: 'details', label: 'Resultados', minWidth: 20 },
];

export const aofasColumns: AOFASReportTableColumn[] = [
  { id: 'date', label: 'Data', minWidth: 50 },
  { id: 'result_pain', label: 'Escala de dor', minWidth: 100, hideForSmallScreen: true },
  { id: 'result_function', label: 'Escala funcional', minWidth: 100, hideForSmallScreen: true },
  { id: 'result_alignment', label: 'Escala de alinhamento', minWidth: 100, hideForSmallScreen: true },
  { id: 'result_total', label: 'Escala total', minWidth: 100, hideForSmallScreen: true },
  { id: 'patient', label: 'Paciente', minWidth: 100 },
  { id: 'details', label: 'Resultados', minWidth: 20 },
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
      patient: form.patient?.name,
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

export function setDataIntoNoResultTable(
  data: PatientForm[],
  selectForm: (chosen: PatientForm) => void
) {
  return data.map((form) => {
    return {
      id: form.id,
      date: new Date(form.updated_at).toLocaleDateString(),
      patient: form.patient?.name,
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

export function setDataIntoAllResultTable(
  data: PatientForm[],
  selectForm: (chosen: PatientForm) => void
) {
  return data.map((form) => {
    return {
      id: form.id,
      date: new Date(form.updated_at).toLocaleDateString(),
      patient: form.patient?.name,
      type: form.type,
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
      patient: form.patient?.name,
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
      result_anxiety: (form.results as PatientHADResult)?.ansiedade.text,
      result_depression: (form.results as PatientHADResult)?.depressao.text,
      patient: form.patient?.name,
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

export function setDateIntoWOMACTable(
  data: PatientForm[],
  selectForm: (chosen: PatientForm) => void
) {
  return data.map((form) => {
    return {
      id: form.id,
      date: new Date(form.updated_at).toLocaleDateString(),
      result: (form.results as PatientWOMACResult)?.total_percentage,
      patient: form.patient?.name,
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

export function setDateIntoSPADITable(
  data: PatientForm[],
  selectForm: (chosen: PatientForm) => void
) {
  return data.map((form) => {
    const results = form.results as PatientSPADIResult;
    return {
      id: form.id,
      date: new Date(form.updated_at).toLocaleDateString(),
      result_disability: results.disability.percentage,
      result_pain: results.pain.percentage,
      result_total: results.total.percentage,
      patient: form.patient?.name,
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

export function setDataIntoAOFASTable(
  data: PatientForm[],
  selectForm: (chosen: PatientForm) => void
) {
  return data.map((form) => {
    return {
      id: form.id,
      date: new Date(form.updated_at).toLocaleDateString(),
      result_pain: (form.results as PatientAOFASResult)?.pain_score,
      result_function: (form.results as PatientAOFASResult)?.function_score,
      result_alignment: (form.results as PatientAOFASResult)?.alignment_score,
      result_total: (form.results as PatientAOFASResult)?.total.percentage,
      patient: form.patient?.name,
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
