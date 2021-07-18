import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import './App.css';
import LeftNav from './components/LeftNav';
import StickyHeadTable from './components/StickyHeadTable';

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

function App() {
  const classes = useStyles();

  return (
    <div
      className={clsx('App', {
        [classes.appRoot]: true,
      })}
    >
      <CssBaseline />
      <LeftNav />
      <main className={classes.content}>
        <StickyHeadTable />
      </main>
    </div>
  );
}

export default App;
