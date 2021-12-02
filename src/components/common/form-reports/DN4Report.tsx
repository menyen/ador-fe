import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import GenericTable from '../../GenericTable';
import { PatientForm } from '../../../models/PatientForm';
import {
  setDataIntoSimpleTable,
  simpleColumns,
} from '../../../utils/reportTable';
import { ReportPageProps, SimpleReportTableData } from '../../../interfaces';
import DN4InnerReport from '../inner-report/DN4InnerReport';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
  })
);

function DN4Report(props: ReportPageProps) {
  const classes = useStyles();

  const [selectedForm, setSelectedForm] = useState<PatientForm>(
    props.data[props.data.length - 1]
  );
  const [rows, setRows] = useState<SimpleReportTableData[]>([]);

  useEffect(() => {
    setRows(setDataIntoSimpleTable(props.data, setSelectedForm));
  }, [props.data, setSelectedForm]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    props.goToSummary();
  }

  return (
    <>
      <Grid container spacing={1} className={classes.root}>
        {props.hideBreadcrumb ? (
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/" onClick={handleClick}>
                Resultados
              </Link>
              <Typography color="textPrimary">Dor Neuropática (DN4)</Typography>
            </Breadcrumbs>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <GenericTable
            columns={simpleColumns}
            rows={rows}
            shouldHideCheckboxes
          />
        </Grid>
      </Grid>
      <DN4InnerReport selectedForm={selectedForm} />
    </>
  );
}

export default DN4Report;
