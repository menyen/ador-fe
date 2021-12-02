import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import GenericTable from '../GenericTable';
import { PatientForm } from '../../models/PatientForm';
import { NoResultReportTableData } from '../../interfaces';
import {
  noResultColumns,
  setDataIntoNoResultTable,
} from '../../utils/reportTable';
import EPCInnerReport from './inner-report/EPCInnerReport';
import DN4InnerReport from './inner-report/DN4InnerReport';
import HADInnerReport from './inner-report/HADInnerReport';
import OswestryInnerReport from './inner-report/OswestryInnerReport';
import FibromialgiaInnerReport from './inner-report/FibromialgiaInnerReport';
import IADInnerReport from './inner-report/IADInnerReport';
import SBSTInnerReport from './inner-report/SBSTInnerReport';
import PSEQInnerReport from './inner-report/PSEQInnerReport';
import WOMACInnerReport from './inner-report/WOMACInnerReport';
import SPADIInnerReport from './inner-report/SPADIInnerReport';
import BPIInnerReport from './inner-report/BPIInnerReport';
import SF36InnerReport from './inner-report/SF36InnerReport';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
  })
);

function selectRenderByType(form: PatientForm) {
  switch (form.type) {
    case 'EPC':
      return <EPCInnerReport selectedForm={form} />;
    case 'DN4':
      return <DN4InnerReport selectedForm={form} />;
    case 'HAD':
      return <HADInnerReport selectedForm={form} />;
    case 'OSWESTRY':
      return <OswestryInnerReport selectedForm={form} />;
    case 'FIBROMIALGIA':
      return <FibromialgiaInnerReport selectedForm={form} />;
    case 'IAD':
      return <IADInnerReport selectedForm={form} />;
    case 'SBST':
      return <SBSTInnerReport selectedForm={form} />;
    case 'PSEQ':
      return <PSEQInnerReport selectedForm={form} />;
    case 'WOMAC':
      return <WOMACInnerReport selectedForm={form} />;
    case 'SPADI':
      return <SPADIInnerReport selectedForm={form} />;
    case 'BPI':
      return <BPIInnerReport selectedForm={form} />;
    case 'SF36':
      return <SF36InnerReport data={[form]} />;
    default:
      return null;
  }
}

function AllReports({ data }: { data: PatientForm[] }) {
  const classes = useStyles();
  const [selectedForm, setSelectedForm] = useState<PatientForm>(
    data[data.length - 1]
  );
  const [rows, setRows] = useState<NoResultReportTableData[]>([]);

  useEffect(() => {
    setRows(setDataIntoNoResultTable(data, setSelectedForm));
  }, [data, setSelectedForm]);
  return (
    <>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
          <GenericTable
            columns={noResultColumns}
            rows={rows}
            shouldHideCheckboxes
          />
        </Grid>
      </Grid>
      {selectRenderByType(selectedForm)}
    </>
  );
}

export default AllReports;
