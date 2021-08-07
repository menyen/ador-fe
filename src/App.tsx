import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import PhysicianPage from './components/PhysicianPage';
import useToken from './hooks/useToken';

import './App.css';

function App() {
  const [token, setToken] = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/physician" />
          </Route>
          <Route path="/physician">
            <PhysicianPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
