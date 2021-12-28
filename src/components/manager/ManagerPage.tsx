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
  ManagerPanelType,
  PatientPayload,
  UserPayload,
} from '../../interfaces';
import UsersTable from './UsersTable';
import userReducer from '../../reducers/user';
import {
  getUsers,
  deleteUser,
  updateUser,
  createUser,
} from '../../actions/user';
import { User } from '../../models/User';
import UserForm from './UserForm';
import patientReducer from '../../reducers/patient';
import questionaireReducer from '../../reducers/questionaire';
import { Patient } from '../../models/Patient';
import {
  createPatient,
  deletePatient,
  getPatients,
  updatePatient,
} from '../../actions/patient';
import {
  clearQuestionaires,
  getQuestionaires,
  sendQuestionaires,
} from '../../actions/questionaire';
import PatientsTable from '../common/PatientsTable';
import PatientForm from '../common/PatientForm';
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

export default function ManagerPage() {
  const classes = useStyles();
  const [panel, setPanel] = useState<ManagerPanelType>(
    ManagerPanelType.UsersTable
  );
  const [currentUser, setCurrentUser] = useState<User>();
  const [users, usersDispatch] = useReducer(userReducer, []);
  const [currentPatient, setCurrentPatient] = useState<Patient>();

  const [patients, patientDispatch] = useReducer(patientReducer, []);
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

  useEffect(() => {
    if (panel === ManagerPanelType.UsersTable) {
      getUsers(setErrorAlert)(usersDispatch);
    }
  }, [setErrorAlert, panel]);

  useEffect(() => {
    if (panel === ManagerPanelType.PatientsTable) {
      getPatients(setErrorAlert)(patientDispatch);
    }
  }, [setErrorAlert, panel]);

  const setUser = async (id: number | undefined, payload: UserPayload) => {
    if (id) {
      await updateUser(id, payload, setErrorAlert)(usersDispatch);
    } else {
      await createUser(payload, setErrorAlert)(usersDispatch);
    }
    setPanel(ManagerPanelType.UsersTable);
  };

  const setPatient = async (
    id: number | undefined,
    patientPayload: PatientPayload,
    questionairePayload: string[],
    sendEmail: boolean
  ) => {
    let newPatient;
    if (id) {
      delete patientPayload.email;
      await updatePatient(id, patientPayload, setErrorAlert)(patientDispatch);
    } else {
      newPatient = await createPatient(
        patientPayload,
        setErrorAlert
      )(patientDispatch);
    }
    if (id || newPatient.id) {
      await sendQuestionaires(
        id ?? newPatient.id,
        questionairePayload,
        sendEmail,
        setErrorAlert
      )(questionairesDispatch);
      setPanel(ManagerPanelType.PatientsTable);
    }
  };

  return (
    <div
      className={clsx({
        [classes.appRoot]: true,
      })}
    >
      <CssBaseline />
      <LeftNav
        role="manager"
        currentPanel={panel}
        setPanel={(panel: AllPanelTypes) => setPanel(panel as ManagerPanelType)}
      />
      <main className={classes.content}>
        {panel === ManagerPanelType.UsersTable && (
          <UsersTable
            users={users}
            deleteUser={(user: User) =>
              deleteUser(user, setErrorAlert)(usersDispatch)
            }
            openUserForm={(user?: User) => {
              setCurrentUser(user);
              setPanel(ManagerPanelType.UserForm);
            }}
          />
        )}
        {panel === ManagerPanelType.UserForm && (
          <UserForm
            currentUser={currentUser}
            setUser={setUser}
            openUsersTablePage={() => setPanel(ManagerPanelType.UsersTable)}
          />
        )}
        {panel === ManagerPanelType.PatientsTable && (
          <PatientsTable
            patients={patients}
            deletePatient={(patient: Patient) =>
              deletePatient(patient, setErrorAlert)(patientDispatch)
            }
            openPatientForm={async (patient?: Patient) => {
              setCurrentPatient(patient);
              patient
                ? await getQuestionaires(
                    patient.id,
                    setErrorAlert
                  )(questionairesDispatch)
                : clearQuestionaires()(questionairesDispatch);
              setPanel(ManagerPanelType.PatientForm);
            }}
          />
        )}
        {panel === ManagerPanelType.PatientForm && (
          <>
            <PatientForm
              currentPatient={currentPatient}
              setPatient={setPatient}
              questionaires={questionaires}
              openPatientsTablePage={() =>
                setPanel(ManagerPanelType.PatientsTable)
              }
            />
            <PatientReports
              questionaires={questionaires?.filter((q) => q.status === 'DONE')}
            />
          </>
        )}
        {panel === ManagerPanelType.ReportsTable && (
          <>
            <ReportsTable patients={patients} />
          </>
        )}
      </main>
    </div>
  );
}
