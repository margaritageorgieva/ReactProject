import React from 'react';
import './App.css';
import Layout from'./components/layout/Layout'; 
import { Switch, Route } from 'react-router-dom';
import { Login } from './components/auth/login/Login';
import { AuthenticatedRoute } from './components/core/guards/AuthenticatedRoute';
import { NonAuthenticatedRoute } from './components/core/guards/NonAuthenticatedRoute';
import { Register } from './components/auth/register/Register';

function App() {
  return (
    <div className="App">
     
      <Switch>
        <NonAuthenticatedRoute exact path='/login' component={Login}/> 
        <NonAuthenticatedRoute exact path='/register' component={Register}/>
        <AuthenticatedRoute path='/' component={Layout}/> 
      </Switch>
      
    </div>
  );
}
export default App;

//NonAuthenticatedRoute - вече логнатите потребители да нямат достъп до него 
//AuthenticatedRoute - достъпка се само когато сме логнати 
