import React, { useState } from "react";
import './Login_admin.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login_admin() {
    const [id , setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlesubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8001/adminlogin?id=${id}&password=${password}`);
            console.log(response.data);
            if(response.data === "success"){
                navigate('/admin');
            } else {
                setError("Incorrect username or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "Login failed");
        }
    }

    const handleChange = (e)=>{
        let value = e.target.value;
        setId(value);
    };

    const handlePasschange = (e)=>{
        let value = e.target.value;
        setPassword(value);
    };

    return(
        <>
        <div className="login-container">
            <div className="login-details">
                <div className="admin-login">
                    <h2 className="heading">Admin Login</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form className="admin-details" onSubmit={handlesubmit}>
                        <label>Username</label>
                        <input type="text" value={id} onChange={handleChange} placeholder="Admin Username" />
                        <label>Password</label>
                        <input type="password" value={password} onChange={handlePasschange} placeholder="Admin Password" />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login_admin;
