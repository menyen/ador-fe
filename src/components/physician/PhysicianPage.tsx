import { useEffect, useReducer, useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import LeftNav from '../LeftNav';
import PatientsTable from './PatientsTable';
import { PatientPayload, PhysicianPanelType } from '../../interfaces';
import { Patient } from '../../models/Patient';
import patientReducer from '../../reducers/patient';
import {
  createPatient,
  deletePatient,
  getPatients,
  updatePatient,
} from '../../actions/patient';
import PatientForm from './PatientForm';

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
  const [panel, setPanel] = useState<PhysicianPanelType>(
    PhysicianPanelType.PatientsTable
  );
  const [currentPatient, setCurrentPatient] = useState<Patient>();

  const [patients, dispatch] = useReducer(patientReducer, []);

  useEffect(() => {
    getPatients()(dispatch);
  }, []);

  const setPatient = async (
    id: number | undefined,
    payload: PatientPayload
  ) => {
    if (id) {
      await updatePatient(id, payload)(dispatch);
    } else {
      await createPatient(payload)(dispatch);
    }
    setPanel(PhysicianPanelType.PatientsTable);
  };

  return (
    <div
      className={clsx({
        [classes.appRoot]: true,
      })}
    >
      <CssBaseline />
      <LeftNav
        role="physician"
        currentPanel={PhysicianPanelType.PatientsTable}
      />
      <main className={classes.content}>
        {panel === PhysicianPanelType.PatientsTable && (
          <PatientsTable
            patients={patients}
            deletePatient={(patient: Patient) =>
              deletePatient(patient)(dispatch)
            }
            openPatientForm={(patient?: Patient) => {
              setCurrentPatient(patient);
              setPanel(PhysicianPanelType.PatientForm);
            }}
          />
        )}
        {panel === PhysicianPanelType.PatientForm && (
          <PatientForm
            currentPatient={currentPatient}
            setPatient={setPatient}
            openPatientsTablePage={() =>
              setPanel(PhysicianPanelType.PatientsTable)
            }
          />
        )}
      </main>
    </div>
  );
}

export default PhysicianPage;
