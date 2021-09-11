import { useEffect, useState } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { PatientTableColumn, PatientTableData } from '../../interfaces';
import { Patient } from '../../models/Patient';
import GenericTable from '../GenericTable';
import { OrangeButton } from '../Buttons';
import Grid from '@material-ui/core/Grid';

const columns: PatientTableColumn[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'email', label: 'E-mail', minWidth: 100 },
  {
    id: 'tax_id',
    label: 'CPF',
    minWidth: 100,
    format: (value: number) =>
      value
        .toString()
        .padStart(11, '0')
        .replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          (regex, arg1, arg2, arg3, arg4) =>
            arg1 + '.' + arg2 + '.' + arg3 + '-' + arg4
        ),
  },
  { id: 'phone', label: 'Telefone', minWidth: 100 },
  { id: 'birthdate', label: 'Nascimento', minWidth: 100 },
  { id: 'gender', label: 'Sexo', minWidth: 100 },
  { id: 'details', label: 'Detalhes', minWidth: 50 },
  // {
  //   id: 'lastQnaireDate',
  //   label: 'Data do último questionário',
  //   minWidth: 170,
  //   format: (value: number) => {
  //     const dateFormat = new Date(value);
  //     return (
  //       dateFormat.getDate() +
  //       '/' +
  //       (dateFormat.getMonth() + 1) +
  //       '/' +
  //       dateFormat.getFullYear()
  //     );
  //   },
  // },
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
  })
);
interface PatientsTableProps {
  patients: Patient[];
  deletePatient: (patient: Patient) => Promise<void>;
  openPatientForm: (patient?: Patient) => void;
}

export default function PatientsTable(props: PatientsTableProps) {
  const classes = useStyles();
  const [rows, setRows] = useState<PatientTableData[]>([]);

  const { deletePatient, openPatientForm, patients } = props;

  useEffect(() => {
    setRows(setPatientsIntoTable(patients, deletePatient, openPatientForm));
  }, [patients, deletePatient]);

  return (
    <Grid
      container
      className={classes.root}
      spacing={1}
      alignItems="flex-end"
      justifyContent="flex-end"
    >
      <OrangeButton
        variant="contained"
        color="primary"
        onClick={() => props.openPatientForm()}
      >
        Cadastrar novo Patiente
      </OrangeButton>
      <GenericTable columns={columns} rows={rows} />
    </Grid>
  );
}
