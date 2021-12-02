import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import GenericTable from '../../GenericTable';
import { PatientForm } from '../../../models/PatientForm';
import {
  noResultColumns,
  setDataIntoNoResultTable,
} from '../../../utils/reportTable';
import { NoResultReportTableData, ReportPageProps } from '../../../interfaces';
import BPIInnerReport from '../inner-report/BPIInnerReport';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
  })
);

function BPIReport(props: ReportPageProps) {
  const classes = useStyles();

  const [selectedForm, setSelectedForm] = useState<PatientForm>(
    props.data[props.data.length - 1]
  );
  const [rows, setRows] = useState<NoResultReportTableData[]>([]);

  useEffect(() => {
    setRows(setDataIntoNoResultTable(props.data, setSelectedForm));
  }, [props.data, setSelectedForm]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    props.goToSummary();
  }

  return (
    <>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              Resultados
            </Link>
            <Typography color="textPrimary">
              Breve Inventário de Dor (BPI)
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          <GenericTable
            columns={noResultColumns}
            rows={rows}
            shouldHideCheckboxes
          />
        </Grid>
      </Grid>
      <BPIInnerReport selectedForm={selectedForm} />
    </>
  );
}

export default BPIReport;
