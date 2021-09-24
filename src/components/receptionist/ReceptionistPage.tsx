import { useEffect, useReducer, useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import LeftNav from '../LeftNav';
import PatientsTable from './PatientsTable';
import { PatientPayload, ReceptionistPanelType } from '../../interfaces';
import { Patient } from '../../models/Patient';
import patientReducer from '../../reducers/patient';
import questionaireReducer from '../../reducers/questionaire';
import {
  createPatient,
  deletePatient,
  getPatients,
  updatePatient,
} from '../../actions/patient';
import PatientForm from './PatientForm';
import {
  clearQuestionaires,
  getQuestionaires,
  sendQuestionaires,
} from '../../actions/questionaire';

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

function ReceptionistPage() {
  const classes = useStyles();
  const [panel, setPanel] = useState<ReceptionistPanelType>(
    ReceptionistPanelType.PatientsTable
  );
  const [currentPatient, setCurrentPatient] = useState<Patient>();

  const [patients, dispatch] = useReducer(patientReducer, []);
  const [questionaires, questionairesDispatch] = useReducer(
    questionaireReducer,
    []
  );

  useEffect(() => {
    getPatients()(dispatch);
  }, []);

  const setPatient = async (
    id: number | undefined,
    patientPayload: PatientPayload,
    questionairePayload: string[]
  ) => {
    let newPatient;
    if (id) {
      await updatePatient(id, patientPayload)(dispatch);
    } else {
      newPatient = await createPatient(patientPayload)(dispatch);
    }
    await sendQuestionaires(
      id ?? newPatient.id,
      questionairePayload
    )(questionairesDispatch);
    setPanel(ReceptionistPanelType.PatientsTable);
  };

  return (
    <div
      className={clsx({
        [classes.appRoot]: true,
      })}
    >
      <CssBaseline />
      <LeftNav
        role="receptionist"
        currentPanel={ReceptionistPanelType.PatientsTable}
      />
      <main className={classes.content}>
        {panel === ReceptionistPanelType.PatientsTable && (
          <PatientsTable
            patients={patients}
            deletePatient={(patient: Patient) =>
              deletePatient(patient)(dispatch)
            }
            openPatientForm={(patient?: Patient) => {
              setCurrentPatient(patient);
              patient
                ? getQuestionaires(patient.id)(questionairesDispatch)
                : clearQuestionaires()(questionairesDispatch);
              setPanel(ReceptionistPanelType.PatientForm);
            }}
          />
        )}
        {panel === ReceptionistPanelType.PatientForm && (
          <PatientForm
            currentPatient={currentPatient}
            setPatient={setPatient}
            questionaires={questionaires}
            openPatientsTablePage={() =>
              setPanel(ReceptionistPanelType.PatientsTable)
            }
          />
        )}
      </main>
    </div>
  );
}

export default ReceptionistPage;
