import React from "react";
import '../styles-pages/Login.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login_user from "./Login_user";
import Login_admin from "./Login_admin";

function Login() {
    return(
        <>
        <div className="login-container">
            <h1 className="heading">Login</h1>
            <div className="login-details">
                <div className="user-login">
                    <h2 className="sub-heading">User Login</h2>
                    <form className="user-details">
                     <Link to='/login/user'><button className="btn-login" type="submit">Login</button></Link>
                    </form>
                </div>
                <div className="admin-login">
                    <h2 className="sub-heading">Admin Login</h2>
                    <form className="admin-details">
                     <Link to='/login/admin'><button className="btn-login" type="submit">Admin Login</button></Link>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;