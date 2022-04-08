import React, { useEffect, useState } from "react";
import '../components/Login/Login.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Axios from 'axios';

const Login = () => {

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    const [loginUser, setLoginUser] = useState([]);

    const register = () => {
        Axios.post('http://localhost:3001/register', {
        username: usernameReg, 
        password: passwordReg,
        }).then((response) => {
        console.log(response);
        });
    };

    const login = () => {
        setLoginStatus("")
        setLoginUser([])
        Axios.post('http://localhost:3001/login', {
        username: username, 
        password: password,
        }).then((response) => {
        if (response.data.message) {
            setLoginStatus(response.data.message)
        } else {
            setLoginUser(response.data)
        }
        })
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

        <br></br>
        <h5>{loginStatus}</h5>

        {loginUser.map(val => (
            <div>
                <h5>
                    Logged in as {val.userEmail}
                </h5>
            </div>
        ))}

        </div>
    );
}

export default Login;