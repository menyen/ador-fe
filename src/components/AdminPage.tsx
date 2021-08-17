import { useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import LeftNav from './LeftNav';
import ClinicsTable from './ClinicsTable';
import ClinicForm from './ClinicForm';
import { AdminPanelType } from '../interfaces';
import { Clinic } from '../models/Clinic';
import Settings from './Settings';

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
      />
      <main className={classes.content}>
        {panel === AdminPanelType.ClinicsTable && (
          <ClinicsTable
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
          />
        )}
        {panel === AdminPanelType.Settings && <Settings />}
      </main>
    </div>
  );
}

export default AdminPage;
