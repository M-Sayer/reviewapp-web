import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
 } from 'react-router-dom';
import { Login } from './routes/Login';
import { Reviews } from './routes/Reviews';
import { useSelector } from 'react-redux';
import { selectToken } from './features/loginSlice';

function App() {
  const token = useSelector(selectToken);

  return (
    <Router>
      <Switch>
        <Route 
          exact path='/' 
          component={
            token 
              ? Reviews 
              : Login
          } 
        />
      </Switch>
    </Router>
  );
}

export default App;
