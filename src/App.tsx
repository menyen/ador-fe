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

function App() {
  const [auth, setAuth] = useAuth();

  const currentRole = auth?.user?.roles[0] || 'PATIENT';
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

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/login/patient/:clinic_id">
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
            <PrivateRoute path="/patient">
              <PatientPage />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
