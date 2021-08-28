import { useEffect, useReducer } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import LeftNav from '../LeftNav';
import PacientsTable from './PacientsTable';
import { PhysicianPanelType } from '../../interfaces';
import { Patient } from '../../models/Patient';
import patientReducer from '../../reducers/patient';
import { deletePatient, getPatients } from '../../actions/patient';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appRoot: {
      display: 'flex',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

function PhysicianPage() {
  const classes = useStyles();
  const [patients, dispatch] = useReducer(patientReducer, []);

  useEffect(() => {
    getPatients()(dispatch);
  }, []);
  return (
    <div
      className={clsx({
        [classes.appRoot]: true,
      })}
    >
      <CssBaseline />
      <LeftNav
        role="physician"
        currentPanel={PhysicianPanelType.PacientsTable}
      />
      <main className={classes.content}>
        <PacientsTable
          patients={patients}
          deletePatient={(patient: Patient) => deletePatient(patient)(dispatch)}
        />
      </main>
    </div>
  );
}

export default PhysicianPage;
