import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import GenericTable from '../../GenericTable';
import { PatientForm, PatientSBSTResult } from '../../../models/PatientForm';
import { ReportPageProps, SimpleReportTableData } from '../../../interfaces';
import {
  setDataIntoSimpleTable,
  simpleColumns,
} from '../../../utils/reportTable';
import SBSTInnerReport from '../inner-report/SBSTInnerReport';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '32px',
    },
  })
);

function SBSTReport(props: ReportPageProps) {
  const classes = useStyles();
  const [selectedForm, setSelectedForm] = useState<PatientForm>(
    props.data[props.data.length - 1]
  );
  const [rows, setRows] = useState<SimpleReportTableData[]>([]);

  useEffect(() => {
    setRows(
      setDataIntoSimpleTable(
        props.data.map((form: PatientForm) => ({
          ...form,
          text: (form.results as PatientSBSTResult).result,
        })),
        setSelectedForm
      )
    );
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
                Start Back Screening Tool (SBST)
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
      <SBSTInnerReport selectedForm={selectedForm} />
    </>
  );
}

export default SBSTReport;
