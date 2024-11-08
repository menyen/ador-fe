import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import { PatientPanel } from '../../interfaces';
import OnBoard from './OnBoard';
import EPC from './EPC';
import QuestionaireList from './QuestionaireList';
import useAuth from '../../hooks/useAuth';
import DN4 from './DN4';
import OSWESTRY from './OSWESTRY';
import HAD from './HAD';
import SF36 from './SF36';
import BPI from './BPI';
import Fibromialgia from './Fibromialgia';
import IAD from './IAD';
import SBST from './SBST';
import PSEQ from './PSEQ';
import WOMAC from './WOMAC';
import SPADI from './SPADI';
import AOFAS from './AOFAS';

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
  const [auth] = useAuth();

  return (
    <div className={classes.root}>
      {hasOnboarded ? (
        <>
          {currentPanel === PatientPanel.INITIAL && (
            <QuestionaireList
              setCurrentPanel={setCurrentPanel}
              patientInfo={auth.patient!}
            />
          )}
          {currentPanel === PatientPanel.EPC && (
            <EPC setCurrentPanel={setCurrentPanel} patientAuth={auth} />
          )}
          {currentPanel === PatientPanel.DN4 && (
            <DN4 setCurrentPanel={setCurrentPanel} patientAuth={auth} />
          )}
          {currentPanel === PatientPanel.OSWESTRY && (
            <OSWESTRY setCurrentPanel={setCurrentPanel} patientAuth={auth} />
          )}
          {currentPanel === PatientPanel.HAD && (
            <HAD setCurrentPanel={setCurrentPanel} patientAuth={auth} />
          )}
          {currentPanel === PatientPanel.SF36 && (
            <SF36 setCurrentPanel={setCurrentPanel} patientAuth={auth} />
          )}
          {currentPanel === PatientPanel.BPI && (
            <BPI setCurrentPanel={setCurrentPanel} patientAuth={auth} />
          )}
          {currentPanel === PatientPanel.FIBROMIALGIA && (
            <Fibromialgia
              setCurrentPanel={setCurrentPanel}
              patientAuth={auth}
            />
          )}
          {currentPanel === PatientPanel.IAD && (
            <IAD setCurrentPanel={setCurrentPanel} patientAuth={auth} />
          )}
          {currentPanel === PatientPanel.SBST && (
            <SBST setCurrentPanel={setCurrentPanel} patientAuth={auth} />
          )}
          {currentPanel === PatientPanel.PSEQ && (
            <PSEQ setCurrentPanel={setCurrentPanel} patientAuth={auth} />
          )}
          {currentPanel === PatientPanel.WOMAC && (
            <WOMAC setCurrentPanel={setCurrentPanel} patientAuth={auth} />
          )}
          {currentPanel === PatientPanel.SPADI && (
            <SPADI setCurrentPanel={setCurrentPanel} patientAuth={auth} />
          )}
          {currentPanel === PatientPanel.AOFAS && (
            <AOFAS setCurrentPanel={setCurrentPanel} patientAuth={auth} />
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
