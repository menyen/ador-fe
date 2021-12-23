import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import GenericTable from '../../GenericTable';
import { PatientForm } from '../../../models/PatientForm';
import { AOFASReportTableData, ReportPageProps } from '../../../interfaces';
import { aofasColumns, setDataIntoAOFASTable } from '../../../utils/reportTable';
import AOFASInnerReport from '../inner-report/AOFASInnerReport';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
  })
);

function AOFASReport(props: ReportPageProps) {
  const classes = useStyles();

  const [selectedForm, setSelectedForm] = useState<PatientForm>(
    props.data[props.data.length - 1]
  );
  const [rows, setRows] = useState<AOFASReportTableData[]>([]);

  useEffect(() => {
    setRows(setDataIntoAOFASTable(props.data, setSelectedForm));
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
              <Typography color="textPrimary">AOFAS</Typography>
            </Breadcrumbs>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <GenericTable
            columns={aofasColumns}
            rows={rows}
            shouldHideCheckboxes
          />
        </Grid>
      </Grid>
      <AOFASInnerReport selectedForm={selectedForm} />
    </>
  );
}

export default AOFASReport;
