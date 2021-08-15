import { useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import LeftNav from './LeftNav';
import ClinicsTable from './ClinicsTable';
import ClinicForm from './ClinicForm';
import { AdminPanelType } from '../interfaces';

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
      />
      <main className={classes.content}>
        {panel === AdminPanelType.ClinicsTable && (
          <ClinicsTable
            openNewClinicForm={() => setPanel(AdminPanelType.ClinicForm)}
          />
        )}
        {panel === AdminPanelType.ClinicForm && (
          <ClinicForm
            openClinicsTablePage={() => setPanel(AdminPanelType.ClinicsTable)}
          />
        )}
        {/* {panel === AdminPanelType.Settings && <Settings />} */}
      </main>
    </div>
  );
}

export default AdminPage;
