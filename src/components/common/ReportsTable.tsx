import React, { useContext, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { deepOrange } from '@material-ui/core/colors';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import { QUESTIONAIRE_LIST } from '../../interfaces';
import { AlertContext } from '../../utils/alert';
import { OrangeButton, OutlinedButton } from '../Buttons';
import { Patient } from '../../models/Patient';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '64px',
      width: '100%',
      padding: theme.spacing(4),
    },
    headerSection: {
      color: deepOrange[500],
    },
    ownerHeaderSection: {
      marginTop: theme.spacing(4),
    },
    footerSection: {
      marginTop: theme.spacing(4),
    },
  })
);

interface ReportsTableProps {
  patients: Patient[];
  fetchReports: (
    patient_id: number,
    start_date: string,
    end_date: string,
    type: string,
    setAlertMessage: (message: string) => void
  ) => Promise<void>;
}

export default function ReportsTable(props: ReportsTableProps) {
  const classes = useStyles();

  const [patientId, setPatientId] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [reportType, setReportType] = useState<string>('');
  const [, setAlertMessage] = useContext(AlertContext);

  const { fetchReports, patients } = props;

  const searchReports = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetchReports(patientId, startDate, endDate, reportType, setAlertMessage);
  };

  return (
    <Paper className={classes.root}>
      <form onSubmit={searchReports}>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
        >
          <Typography
            variant="h6"
            gutterBottom
            className={classes.headerSection}
          >
            Relatórios
          </Typography>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <InputLabel htmlFor="birthdate-input">Período</InputLabel>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  id="start-date-input"
                  defaultValue={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  id="end-date-input"
                  defaultValue={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="form-select">Questionário</InputLabel>
            <Select
              native
              id="form-select"
              onChange={(e) => setReportType(e.target.value as string)}
            >
              {QUESTIONAIRE_LIST.map((form) => (
                <option key={form.value} value={form.value}>
                  {form.label}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="patient-id-input">Paciente</InputLabel>
            <Select
              fullWidth
              native
              id="physician-id-input"
              value={patientId}
              onChange={(e) => setPatientId(Number(e.target.value))}
            >
              {patients?.length &&
                patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            {/*Report result goes here*/}
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          className={classes.footerSection}
        >
          <OutlinedButton
            variant="outlined"
            // onClick={props.openPatientsTablePage}
          >
            Limpar
          </OutlinedButton>
          <OrangeButton type="submit">Filtrar</OrangeButton>
        </Grid>
      </form>
    </Paper>
  );
}
