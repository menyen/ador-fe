import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import GenericTable from '../../GenericTable';
import { PatientForm } from '../../../models/PatientForm';
import { NoResultReportTableData, ReportPageProps } from '../../../interfaces';
import {
  setDataIntoNoResultTable,
  simpleColumns,
} from '../../../utils/reportTable';
import IADInnerReport from '../inner-report/IADInnerReport';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
  })
);

function IADReport(props: ReportPageProps) {
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
        {props.hideBreadcrumb ? (
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/" onClick={handleClick}>
                Resultados
              </Link>
              <Typography color="textPrimary">
                Inventário de atitude frente à dor
              </Typography>
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
      <IADInnerReport selectedForm={selectedForm} />
    </>
  );
}

export default IADReport;
