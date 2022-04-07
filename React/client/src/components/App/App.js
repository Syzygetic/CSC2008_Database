import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Axios from 'axios';



function App() {
  
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const register = () => {
    Axios.post('http://localhost:3001/register', {
      username: usernameReg, 
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: username, 
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        setLoginStatus(<a href="http://localhost:3000/Dashboard">Click here to access Dashboard</a>);
      }
    
    });
  };



  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input 
          type="text" 
          onChange={(e)=> {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input 
          type="password" 
          onChange={(e)=> {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register}> Register </button>
      </div>



      <div className="login">
        <h1>Login</h1>
        <input 
          type="text"
          placeholder="User email..." 
          onChange={(e)=> {
            setUsername(e.target.value);
          }}
        />
        <input 
          type="password" 
          placeholder="Password..."
          onChange={(e)=> {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}> Login </button>
      </div>

      <h1>{loginStatus}</h1>
      <div className="wrapper">
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/Dashboard" element={<Dashboard/>}>
             {/* <Dashboard /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      
    </div>

    // <div className="wrapper">
    //   <h1>Application</h1>
    //   Access Dashboard here:&nbsp; 
    //     <a href="http://localhost:3000/Dashboard">
    //         Dashboard
    //     </a>
    //   {/* <Link to="/Dashboard" className="btn btn-primary">Go to Dashboard</Link> */}
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/Dashboard" element={<Dashboard/>}>
    //         {/* <Dashboard /> */}
    //       </Route>
    //       <Route path="/Preferences" element={<Preferences/>}>
    //         {/* <Preferences /> */}
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    //   {/* <NavLink to="/Dashboard">Dashboard</NavLink> */}
    // </div>
  );
}

export default App;