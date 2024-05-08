import React, { useState } from "react";
import './New_userlogin.css';
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";

function NewUser() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8001/userlogin?id=${id}&password=${password}`);
            console.log(response);
            console.log(response.data);
            if (response.data === "success") {
                navigate('/app', { state: { username: id } });
            } else {
                setError("Incorrect username or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "Login failed");
        }
    };

    const handlesave = async (e) => {
        try{
            navigate('/login/user');
        }
        catch (error) {
            setError("Incorrect username or password");
        }
    };

    return (
        <>
            <div className="login-container">
            <Link className='a-register' to="/register"><button className="registration-button">Registration</button></Link>
                <div className="login-details">
                    <div className="newuser-login">
                        <h2 className="heading-user">New-User Login</h2>
                        {error && <p className="error-message">{error}</p>}
                        <form className="newuser-details" onSubmit={handleSubmit}>
                            <label>Username</label>
                            <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Student regno" />
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Student Password" />
                            <button type="submit" onClick={handlesave}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewUser;
