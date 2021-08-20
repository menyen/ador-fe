import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';

import Login from './components/Login';
import PhysicianPage from './components/PhysicianPage';
import useAuth from './hooks/useAuth';
import { RolesEnum } from './interfaces';
import { isValidRole } from './utils/loggedUser';
import AdminPage from './components/AdminPage';

import './App.css';

function App() {
  const [auth, setAuth] = useAuth();

  const currentRole = auth?.user?.roles[0];
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
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/login'>
            <Login setAuth={setAuth} />
          </Route>
          <Route exact path='/'>
            <Redirect to={defaultPath} />
          </Route>
          <PrivateRoute path='/admin'>
            <AdminPage />
          </PrivateRoute>
          <PrivateRoute path='/physician'>
            <PhysicianPage />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
