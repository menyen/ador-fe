import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
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
  searchPatients,
  updatePatient,
} from '../../actions/patient';
import PatientForm from '../common/PatientForm';
import {
  clearQuestionaires,
  getQuestionaires,
  sendQuestionaires,
} from '../../actions/questionaire';
import { AlertContext } from '../../utils/alert';
import PatientReports from '../common/PatientReports';
import ReportsTable from '../common/ReportsTable';

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
  const [searchPatientQuery, setSearchPatientQuery] = useState<string>();

  const [patients, dispatch] = useReducer(patientReducer, []);
  const [questionaires, questionairesDispatch] = useReducer(
    questionaireReducer,
    []
  );
  const [, setAlertMessage] = useContext(AlertContext);

  const setErrorAlert = useCallback(
    (message: string) =>
      setAlertMessage({
        type: 'error',
        text: message,
      }),
    [setAlertMessage]
  );

  const fetchPatients = useCallback(() => {
    if (searchPatientQuery) {
      searchPatients(searchPatientQuery, setErrorAlert)(dispatch);
    } else {
      getPatients(setErrorAlert)(dispatch);
    }
  }, [searchPatientQuery, setErrorAlert]);

  useEffect(() => {
    if (panel === PhysicianPanelType.PatientsTable) {
      fetchPatients();
    }
  }, [setErrorAlert, panel, fetchPatients]);

  const setPatient = async (
    id: number | undefined,
    patientPayload: PatientPayload,
    questionairePayload: string[],
    sendEmail: boolean
  ) => {
    let newPatient;
    if (id) {
      delete patientPayload.email;
      await updatePatient(id, patientPayload, setErrorAlert)(dispatch);
    } else {
      newPatient = await createPatient(patientPayload, setErrorAlert)(dispatch);
    }
    if (newPatient) {
      await sendQuestionaires(
        id ?? newPatient.id,
        questionairePayload,
        sendEmail,
        setErrorAlert
      )(questionairesDispatch);
      setPanel(PhysicianPanelType.PatientsTable);
    }
  };

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPatientQuery(event.target.value);
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
        currentPanel={panel}
        setPanel={(panel: AllPanelTypes) =>
          setPanel(panel as PhysicianPanelType)
        }
        searchPatients={onSearchInputChange}
      />
      <main className={classes.content}>
        {panel === PhysicianPanelType.PatientsTable && (
          <PatientsTable
            patients={patients}
            deletePatient={(patient: Patient) =>
              deletePatient(patient, setErrorAlert)(dispatch)
            }
            openPatientForm={async (patient?: Patient) => {
              setCurrentPatient(patient);
              patient
                ? await getQuestionaires(
                    patient.id,
                    setErrorAlert
                  )(questionairesDispatch)
                : clearQuestionaires()(questionairesDispatch);
                setTimeout(function(){setPanel(PhysicianPanelType.PatientForm)}, 500);  
            }}
            updatePatientList={() => getPatients(setErrorAlert)(dispatch)}
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
            <PatientReports
              questionaires={questionaires?.filter((q) => q.status === 'DONE')}
            />
          </>
        )}
        {panel === PhysicianPanelType.ReportsTable && (
          <>
            <ReportsTable patients={patients} />
          </>
        )}
      </main>
    </div>
  );
}

export default PhysicianPage;
