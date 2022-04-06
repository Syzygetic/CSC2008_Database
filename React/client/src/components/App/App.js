import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences';
import useToken from './useToken';



function App() {
  
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      Access Dashboard here:&nbsp; 
        <a href="http://localhost:3000/Dashboard">
            Dashboard
        </a>
      {/* <Link to="/Dashboard" className="btn btn-primary">Go to Dashboard</Link> */}
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard/>}>
            {/* <Dashboard /> */}
          </Route>
          <Route path="/Preferences" element={<Preferences/>}>
            {/* <Preferences /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <NavLink to="/Dashboard">Dashboard</NavLink> */}
    </div>
  );
}

export default App;