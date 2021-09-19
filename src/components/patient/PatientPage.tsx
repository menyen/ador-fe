import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import { PatientPanel } from '../../interfaces';
import OnBoard from './OnBoard';
import EPC from './EPC';
import QuestionaireList from './QuestionaireList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100vh',
    },
  })
);

function getHasOnboardedLocalStorage(): boolean {
  const hasGoneOnboard = localStorage.getItem('onboard') || 'false';
  return JSON.parse(hasGoneOnboard);
}

function setHasOnboardedLocalStorage(isOnboard: boolean): void {
  localStorage.setItem('onboard', JSON.stringify(isOnboard));
}

export default function PatientPage() {
  const classes = useStyles();
  const [hasOnboarded, setHasOnboarded] = React.useState(
    getHasOnboardedLocalStorage()
  );

  const [currentPanel, setCurrentPanel] = React.useState(PatientPanel.INITIAL);

  return (
    <div className={classes.root}>
      {hasOnboarded ? (
        <>
          {currentPanel === PatientPanel.INITIAL && (
            <QuestionaireList setCurrentPanel={setCurrentPanel} />
          )}
          {currentPanel === PatientPanel.EPC && (
            <EPC setCurrentPanel={setCurrentPanel} />
          )}
        </>
      ) : (
        <OnBoard
          setHasOnboardedToTrue={() => {
            setHasOnboardedLocalStorage(true);
            setHasOnboarded(true);
          }}
        />
      )}
    </div>
  );
}
