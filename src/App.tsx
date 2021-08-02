import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/Login'
import Medico from './components/Medico';
import useToken from './hooks/useToken';

import './App.css';

function App() {
  const [token, setToken] = useToken();
  
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div
      className='App'
    >
      <BrowserRouter>
      <Switch>
        <Route path='/medico'>
          <Medico />
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
