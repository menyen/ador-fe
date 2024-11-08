import { useState } from 'react';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import MuiAlert, { Color } from '@material-ui/lab/Alert';
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';

import Login from './components/Login';
import PhysicianPage from './components/physician/PhysicianPage';
import useAuth from './hooks/useAuth';
import { RolesEnum } from './interfaces';
import { AuthContext, isValidRole } from './utils/loggedUser';
import AdminPage from './components/admin/AdminPage';

import './App.css';
import ManagerPage from './components/manager/ManagerPage';
import PatientPage from './components/patient/PatientPage';
import ReceptionistPage from './components/receptionist/ReceptionistPage';
import { AlertContext } from './utils/alert';
import { ClinicSlugContext } from './utils/clinicSlug';

function App() {
  const [auth, setAuth] = useAuth();
  const [alertMessage, setAlertMessage] = useState({ text: '', type: 'error' });
  const [clinicSlug, setClinicSlug] = useState('');

  const currentRole =
    auth?.user?.roles[0] || (auth?.patient?.id ? 'PATIENT' : undefined);
  const defaultPath = isValidRole(currentRole)
    ? `/${RolesEnum[currentRole]}`
    : '/login';

  function PrivateRoute({ children, ...rest }: RouteProps) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.token ? (
            rest.path?.includes(defaultPath) ? (
              children
            ) : (
              <Redirect to={defaultPath} />
            )
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  const handleClose = (
    event: React.SyntheticEvent<Element, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertMessage({ text: '', type: 'error' });
  };

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <AlertContext.Provider value={[alertMessage, setAlertMessage]}>
        <div className="App">
          <Snackbar
            open={!!alertMessage.text}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => setAlertMessage({ text: '', type: 'error' })}
              severity={alertMessage.type as Color}
            >
              {alertMessage.text}
            </MuiAlert>
          </Snackbar>
          <ClinicSlugContext.Provider value={[clinicSlug, setClinicSlug]}>
            <BrowserRouter>
              <Switch>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route path="/login/patient/:clinic_slug">
                  <Login isPatient={true} />
                </Route>
                <Route exact path="/">
                  <Redirect to={defaultPath} />
                </Route>
                <PrivateRoute path="/admin">
                  <AdminPage />
                </PrivateRoute>
                <PrivateRoute path="/manager">
                  <ManagerPage />
                </PrivateRoute>
                <PrivateRoute path="/physician">
                  <PhysicianPage />
                </PrivateRoute>
                <PrivateRoute path="/receptionist">
                  <ReceptionistPage />
                </PrivateRoute>
                <PrivateRoute path="/patient">
                  <PatientPage />
                </PrivateRoute>
              </Switch>
            </BrowserRouter>
          </ClinicSlugContext.Provider>
        </div>
      </AlertContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
