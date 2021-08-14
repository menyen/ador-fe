import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import LeftNav from './LeftNav';
import PacientsTable from './PacientsTable';

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

  return (
    <div
      className={clsx({
        [classes.appRoot]: true,
      })}
    >
      <CssBaseline />
      <LeftNav role="physician" />
      <main className={classes.content}>
        <PacientsTable />
      </main>
    </div>
  );
}

export default PhysicianPage;
