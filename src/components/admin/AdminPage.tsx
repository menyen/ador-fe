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
import ClinicsTable from './ClinicsTable';
import ClinicForm from './ClinicForm';
import { AdminPanelType, AllPanelTypes, ClinicPayload, SubscriptionPayload } from '../../interfaces';
import { Clinic } from '../../models/Clinic';
import Settings from './Settings';
import clinicReducer from '../../reducers/clinic';
import {
  createClinic,
  deleteClinic,
  getClinics,
  updateClinic,
} from '../../actions/clinic';
import planReducer from '../../reducers/plan';
import { getPlans } from '../../actions/plan';
import subscriptionReducer from '../../reducers/subscription';
import { updateSubscription } from '../../actions/subscription'
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

function AdminPage() {
  const classes = useStyles();
  const [panel, setPanel] = useState<AdminPanelType>(
    AdminPanelType.ClinicsTable
  );
  const [currentClinic, setCurrentClinic] = useState<Clinic>();
  const [clinics, dispatch] = useReducer(clinicReducer, []);
  const [plans, plansDispatch] = useReducer(planReducer, []);
  const [, subscriptionDispatch] = useReducer(subscriptionReducer, null)
  const [, setAlertMessage] = useContext(AlertContext);

  const setErrorAlert = useCallback(
    (message: string) =>
      setAlertMessage({
        type: 'error',
        text: message,
      }),
    [setAlertMessage]
  );

  const setClinicAndSubscription = async (
    clinicId: number | undefined,
    clinicPayload: ClinicPayload,
    subscriptionId: number | undefined,
    subscriptionPayload: SubscriptionPayload
  ) => {
    if (clinicId) {
      await updateClinic(clinicId, clinicPayload, setErrorAlert)(dispatch);
    } else {
      await createClinic(clinicPayload, setErrorAlert)(dispatch);
    }

    if (
      subscriptionId
      && (
        subscriptionPayload.active_until !== currentClinic?.subscription?.active_until?.split('T')[0]
        || subscriptionPayload.plan_id !== currentClinic?.subscription?.id
      )
    ) {
      await updateSubscription(subscriptionId, subscriptionPayload, setErrorAlert)(subscriptionDispatch);
    }
    getClinics(setErrorAlert)(dispatch);
    setPanel(AdminPanelType.ClinicsTable);
  };

  useEffect(() => {
    getClinics(setErrorAlert)(dispatch);
  }, [setErrorAlert]);

  useEffect(() => {
    getPlans(setErrorAlert)(plansDispatch);
  }, [setErrorAlert]);

  return (
    <div
      className={clsx({
        [classes.appRoot]: true,
      })}
    >
      <CssBaseline />
      <LeftNav
        role="admin"
        currentPanel={panel}
        openClinicsTablePage={() => setPanel(AdminPanelType.ClinicsTable)}
        openTermsOfUsePage={() => setPanel(AdminPanelType.Settings)}
        setPanel={(panel: AllPanelTypes) => setPanel(panel as AdminPanelType)}
      />
      <main className={classes.content}>
        {panel === AdminPanelType.ClinicsTable && (
          <ClinicsTable
            clinics={clinics}
            deleteClinic={(clinic: Clinic) =>
              deleteClinic(clinic, setErrorAlert)(dispatch)
            }
            openClinicForm={(clinic?: Clinic) => {
              setCurrentClinic(clinic);
              setPanel(AdminPanelType.ClinicForm);
            }}
          />
        )}
        {panel === AdminPanelType.ClinicForm && (
          <ClinicForm
            currentClinic={currentClinic}
            openClinicsTablePage={() => setPanel(AdminPanelType.ClinicsTable)}
            setClinicAndSubscription={setClinicAndSubscription}
            plans={plans}
          />
        )}
        {panel === AdminPanelType.Settings && <Settings />}
      </main>
    </div>
  );
}

export default AdminPage;
