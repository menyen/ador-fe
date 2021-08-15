import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { ClinicTableColumn, ClinicTableData } from '../interfaces';
import { getClinic, getClinics } from '../utils/endpointRequests';
import { Clinic } from '../models/Clinic';
import GenericTable from './GenericTable';
import { OrangeButton } from './Buttons';
import { IconButton } from '@material-ui/core';

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

async function fetchSingleClinic(id: number): Promise<Clinic> {
  const resp = await getClinic(id);
  return resp.clinic;
}

async function fetchAllClinics(
  openClinicForm: (clinic?: Clinic) => void
): Promise<ClinicTableData[]> {
  const resp = await getClinics();
  return resp.clinics.map((clinic: ClinicTableData) => {
    const handleClinicDetails = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const clinicDetails = await fetchSingleClinic(clinic.id);
      openClinicForm(clinicDetails);
    };
    clinic.status = (ClinicStatus as any)[clinic.status];
    clinic.details = (
      <IconButton onClick={handleClinicDetails}>
        <VisibilityIcon />
      </IconButton>
    );
    return clinic;
  });
}

interface ClinicsTableProps {
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

  useEffect(() => {
    async function setClinics() {
      const clinics = await fetchAllClinics(props.openClinicForm);
      setRows(clinics);
    }
    setClinics();
  }, []);

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
