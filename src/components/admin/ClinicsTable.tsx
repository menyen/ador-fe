import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { ClinicTableColumn, ClinicTableData } from '../../interfaces';
import { Clinic } from '../../models/Clinic';
import GenericTable from '../GenericTable';
import { OrangeButton } from '../Buttons';

// TODO: Need to double check if these values below are valid in the back-end
enum ClinicStatus {
  ACTIVE = 'Ativo',
  INACTIVE = 'Inativo',
}

const columns: ClinicTableColumn[] = [
  // { id: 'id', label: 'ID' },
  { id: 'name', label: 'Nome', minWidth: 100 },
  { id: 'address_zipcode', label: 'CEP', minWidth: 100 },
  { id: 'address_street', label: 'Endereço', minWidth: 100 },
  { id: 'address_city', label: 'Cidade', minWidth: 100 },
  { id: 'address_state', label: 'Estado', minWidth: 100 },
  { id: 'phone', label: 'Telefone', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'details', label: 'Detalhes', minWidth: 100 },
];

function setClinicsIntoTable(
  clinics: Clinic[],
  deleteClinic: (clinic: Clinic) => Promise<void>,
  openClinicForm: (clinic?: Clinic) => void
) {
  return clinics.map((clinic: ClinicTableData) => {
    const handleClinicDetails = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      openClinicForm(clinic);
    };
    const handleDeleteClinic = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      deleteClinic(clinic);
    };

    clinic.status = (ClinicStatus as any)[clinic.status];
    clinic.details = (
      <>
        <IconButton onClick={handleClinicDetails}>
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={handleDeleteClinic}>
          <DeleteIcon />
        </IconButton>
      </>
    );
    return clinic;
  });
}

interface ClinicsTableProps {
  clinics: Clinic[];
  deleteClinic: (clinic: Clinic) => Promise<void>;
  openClinicForm: (clinic?: Clinic) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '64px',
      width: '100%',
    },
  })
);

export default function ClinicsTable(props: ClinicsTableProps) {
  const classes = useStyles();
  const [rows, setRows] = useState<ClinicTableData[]>([]);

  const { clinics, deleteClinic, openClinicForm } = props;

  useEffect(() => {
    setRows(setClinicsIntoTable(clinics, deleteClinic, openClinicForm));
  }, [clinics, deleteClinic, openClinicForm]);

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
        onClick={() => props.openClinicForm()}
      >
        Cadastrar nova clínica
      </OrangeButton>
      <GenericTable columns={columns} rows={rows} />
    </Grid>
  );
}
