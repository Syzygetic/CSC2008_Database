import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/General/NavBar';
import Home from './screens/Home'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './screens/Login';
import PredictStroke from './screens/PredictStroke';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/predictstroke">
              <PredictStroke />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App;
