import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
    </div>
  );
}

export default App;