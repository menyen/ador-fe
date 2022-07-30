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
import {
  AllPanelTypes,
  PatientPayload,
  ReceptionistPanelType,
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
import PatientsTable from '../common/PatientsTable';
import { AlertContext } from '../../utils/alert';

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
    if (panel === ReceptionistPanelType.PatientsTable) {
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
      setPanel(ReceptionistPanelType.PatientsTable);
    }
  };

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPatientQuery(event.target.value);
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
        setPanel={(panel: AllPanelTypes) =>
          setPanel(panel as ReceptionistPanelType)
        }
        searchPatients={onSearchInputChange}
      />
      <main className={classes.content}>
        {panel === ReceptionistPanelType.PatientsTable && (
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
              setPanel(ReceptionistPanelType.PatientForm);
            }}
            updatePatientList={() => getPatients(setErrorAlert)(dispatch)}
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
