import React, { useContext, useEffect, useReducer, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { deepOrange } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { QUESTIONAIRE_LIST } from '../../interfaces';
import { getUsers } from '../../actions/user';
import userReducer from '../../reducers/user';
import { AlertContext } from '../../utils/alert';
import { OrangeButton, OutlinedButton } from '../Buttons';

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
  fetchReports: (
    patient_id: number,
    start_date: string,
    end_date: string,
    type: string,
    setAlertMessage: (message: string) => void
  ) => void;
}

export default function ReportsTable(props: ReportsTableProps) {
  const classes = useStyles();

  const [patientId, setPatientId] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [reportType, setReportType] = useState<string>('');
  const [users, usersDispatch] = useReducer(userReducer, []);
  const [, setAlertMessage] = useContext(AlertContext);

  useEffect(() => {
    getUsers(setAlertMessage, 'patients')(usersDispatch);
  }, [setAlertMessage]);

  const searchReports = () =>
    props.fetchReports(
      patientId,
      startDate,
      endDate,
      reportType,
      setAlertMessage
    );

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
            <TextField
              fullWidth
              type="date"
              id="start-date-input"
              defaultValue={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              fullWidth
              type="date"
              id="end-date-input"
              defaultValue={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <InputLabel htmlFor="gender-select">Sexo</InputLabel>
              <Select
                native
                id="gender-select"
                // value={gender}
                onChange={(e) => setReportType(e.target.value as string)}
              >
                {QUESTIONAIRE_LIST.map((form) => (
                  <option key={form.value} value={form.value}>
                    {form.label}
                  </option>
                ))}
              </Select>
            </FormControl>
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
              {users?.length &&
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
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
