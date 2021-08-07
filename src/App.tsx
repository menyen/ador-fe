import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';

import Login from './components/Login';
import PhysicianPage from './components/PhysicianPage';
import useToken from './hooks/useToken';

import './App.css';

function App() {
  const [token, setToken] = useToken();

  function PrivateRoute({ children, ...rest }: RouteProps) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          token ? (
            children
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
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
          <PrivateRoute exact path="/">
            <Redirect to="/physician" />
          </PrivateRoute>
          <PrivateRoute path="/physician">
            <PhysicianPage />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
