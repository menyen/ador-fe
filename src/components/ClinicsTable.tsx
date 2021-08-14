import React, { useEffect } from 'react';
import { ClinicTableColumn } from '../interfaces';
import { getClinicis } from '../utils/endpointRequests';
import { Clinic } from '../models/Clinic';
import GenericTable from './GenericTable';

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

export default function PacientsTable() {
  const [rows, setRows] = React.useState<Clinic[]>([]);

  useEffect(() => {
    async function setClinics() {
      const clinics = await fetchData();
      setRows(clinics);
    }
    setClinics();
  }, []);

  return <GenericTable columns={columns} rows={rows} />;
}
