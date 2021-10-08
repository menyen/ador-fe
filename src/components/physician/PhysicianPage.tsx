import { useEffect, useReducer, useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import LeftNav from '../LeftNav';
import PatientsTable from '../common/PatientsTable';
import {
  AllPanelTypes,
  PatientPayload,
  PhysicianPanelType,
} from '../../interfaces';
import { Patient } from '../../models/Patient';
import patientReducer from '../../reducers/patient';
import questionaireReducer from '../../reducers/questionaire';
import {
  createPatient,
  deletePatient,
  getPatients,
  updatePatient,
} from '../../actions/patient';
import PatientForm from '../common/PatientForm';
import {
  clearQuestionaires,
  getQuestionaires,
  sendQuestionaires,
} from '../../actions/questionaire';
import PatientSummary from './PatientSummary';

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
      delete patientPayload.email;
      await updatePatient(id, patientPayload)(dispatch);
    } else {
      newPatient = await createPatient(patientPayload)(dispatch);
    }
    await sendQuestionaires(
      id ?? newPatient.id,
      questionairePayload
    )(questionairesDispatch);
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
        setPanel={(panel: AllPanelTypes) =>
          setPanel(panel as PhysicianPanelType)
        }
      />
      <main className={classes.content}>
        {panel === PhysicianPanelType.PatientsTable && (
          <PatientsTable
            patients={patients}
            deletePatient={(patient: Patient) =>
              deletePatient(patient)(dispatch)
            }
            openPatientForm={async (patient?: Patient) => {
              setCurrentPatient(patient);
              patient
                ? await getQuestionaires(patient.id)(questionairesDispatch)
                : clearQuestionaires()(questionairesDispatch);
              setPanel(PhysicianPanelType.PatientForm);
            }}
          />
        )}
        {panel === PhysicianPanelType.PatientForm && (
          <>
            <PatientForm
              currentPatient={currentPatient}
              setPatient={setPatient}
              questionaires={questionaires}
              openPatientsTablePage={() =>
                setPanel(PhysicianPanelType.PatientsTable)
              }
            />
            <PatientSummary questionaires={questionaires} />
          </>
        )}
      </main>
    </div>
  );
}

export default PhysicianPage;
