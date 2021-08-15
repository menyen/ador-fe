import { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ClinicTableColumn } from '../interfaces';
import { getClinicis } from '../utils/endpointRequests';
import { Clinic } from '../models/Clinic';
import GenericTable from './GenericTable';
import { OrangeButton } from './Buttons';

const columns: ClinicTableColumn[] = [
  // { id: 'id', label: 'ID' },
  { id: 'name', label: 'Nome', minWidth: 100 },
  { id: 'address_zipcode', label: 'CEP', minWidth: 100 },
  { id: 'address_street', label: 'Endereço', minWidth: 100 },
  { id: 'address_city', label: 'Cidade', minWidth: 100 },
  { id: 'address_state', label: 'Estado', minWidth: 100 },
  { id: 'phone', label: 'Telefone', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
];

async function fetchData(): Promise<Clinic[]> {
  const resp = await getClinicis();
  return resp.clinics;
}

interface ClinicsTableProps {
  openNewClinicForm: () => void;
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
  const [rows, setRows] = useState<Clinic[]>([]);

  useEffect(() => {
    async function setClinics() {
      const clinics = await fetchData();
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
        onClick={props.openNewClinicForm}
      >
        Cadastrar nova clínica
      </OrangeButton>
      <GenericTable columns={columns} rows={rows} />
    </Grid>
  );
}
