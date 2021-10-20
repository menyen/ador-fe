import { useContext, useEffect, useReducer, useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import LeftNav from '../LeftNav';
import ClinicsTable from './ClinicsTable';
import ClinicForm from './ClinicForm';
import { AdminPanelType, AllPanelTypes, ClinicPayload } from '../../interfaces';
import { Clinic } from '../../models/Clinic';
import Settings from './Settings';
import clinicReducer from '../../reducers/clinic';
import {
  createClinic,
  deleteClinic,
  getClinics,
  updateClinic,
} from '../../actions/clinic';
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
  const [, setAlertMessage] = useContext(AlertContext);

  const setClinic = async (id: number | undefined, payload: ClinicPayload) => {
    if (id) {
      await updateClinic(id, payload, setAlertMessage)(dispatch);
    } else {
      await createClinic(payload, setAlertMessage)(dispatch);
    }
    setPanel(AdminPanelType.ClinicsTable);
  };

  useEffect(() => {
    getClinics(setAlertMessage)(dispatch);
  }, [setAlertMessage]);

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
              deleteClinic(clinic, setAlertMessage)(dispatch)
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
            setClinic={setClinic}
          />
        )}
        {panel === AdminPanelType.Settings && <Settings />}
      </main>
    </div>
  );
}

export default AdminPage;
