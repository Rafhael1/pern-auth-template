import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Login from './components/Authentication/Login/Login'
import Register from './components/Authentication/Register/Register'
import Home from './components/Home/Home'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  const isAuth = async() => {
    try {

      const baseURL = process.env.NODE_ENV === 'production' ? `api/auth/verify` : `http://localhost:5000/api/auth/verify`
      
      const response = await fetch(baseURL, {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await response.json()

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    isAuth();
  }, [])

  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/" render={props => <Home isAuthenticated={isAuthenticated} />}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
