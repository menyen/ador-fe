import { useEffect, useState } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { PatientTableColumn, PatientTableData } from '../../interfaces';
import { Patient } from '../../models/Patient';
import GenericTable from '../GenericTable';
import { OrangeButton } from '../Buttons';
import { maskCNPJandCPF } from '../../utils/formFieldMask';

const columns: PatientTableColumn[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'email', label: 'E-mail', minWidth: 100, hideForSmallScreen: true },
  {
    id: 'tax_id',
    label: 'CPF',
    minWidth: 100,
    format: (value: string) => maskCNPJandCPF(value),
    hideForSmallScreen: true
  },
  { id: 'phone', label: 'Telefone', minWidth: 100, hideForSmallScreen: true },
  { id: 'birthdate', label: 'Nascimento', minWidth: 100, hideForSmallScreen: true },
  { id: 'gender', label: 'Sexo', minWidth: 100, hideForSmallScreen: true },
  { id: 'details', label: 'Detalhes', minWidth: 50 },
];

function setPatientsIntoTable(
  patients: Patient[],
  deletePatient: (patient: Patient) => Promise<void>,
  openPatientForm: (patient?: Patient) => void
) {
  return patients.map((patient: PatientTableData) => {
    const handlePatientDetails = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      openPatientForm(patient);
    };
    const handleDeletePatient = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      deletePatient(patient);
    };

    patient.details = (
      <>
        <IconButton onClick={handlePatientDetails}>
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={handleDeletePatient}>
          <DeleteIcon />
        </IconButton>
      </>
    );
    return patient;
  });
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '64px',
      width: '100%',
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);
interface PatientsTableProps {
  patients: Patient[];
  deletePatient: (patient: Patient) => Promise<void>;
  openPatientForm: (patient?: Patient) => void;
  updatePatientList: () => void;
}

export default function PatientsTable(props: PatientsTableProps) {
  const classes = useStyles();
  const [rows, setRows] = useState<PatientTableData[]>([]);
  const { deletePatient, openPatientForm, updatePatientList, patients } = props;

  useEffect(() => {
    setRows(setPatientsIntoTable(patients, deletePatient, openPatientForm));
  }, [patients, deletePatient, openPatientForm]);

  return (
    <Grid
      container
      className={classes.root}
      spacing={1}
      alignItems="flex-end"
      justifyContent="flex-end"
    >
      <Grid item xs={12} sm={6}>
        <Button
          variant="contained"
          onClick={() => updatePatientList()}
          className={classes.button}
        >
          Atualizar lista de pacientes
        </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
        <OrangeButton
          variant="contained"
          color="primary"
          onClick={() => props.openPatientForm()}
        >
          Cadastrar novo Paciente
        </OrangeButton>
      </Grid>
      <GenericTable columns={columns} rows={rows} />
    </Grid>
  );
}
