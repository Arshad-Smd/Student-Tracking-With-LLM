import React, { useState } from "react";
import './Login_user.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Login_user() {
    
    const [id , setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

    const handlesubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8001/userlogin?id=${id}&password=${password}`);
            console.log(response);
            console.log(response.data);
            // If login is successful, redirect to /app
            if(response.data === "success"){
                navigate('/app' , { state: { username: id } });}
            else{
                setError("Incorrect username or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            // Update the error state with the error message
            setError(error.message || "Login failed");
        }
    }

    const handleSearch = async(e)=>{ 
        e.preventDefault();
        
        try {
            const response = await axios.get(`http://localhost:8001/form?rollno=${search}`);
            console.log(response.data);
            console.log(response.data.name);
            console.log(response.data.rollno);
            console.log(response.data.branch);
            console.log(response.data.year);
            console.log(response.data.cgpa);
            console.log(response.data.attendance);
            // setFormData(response.data);
            
            setName(response.data.name);
            setRollno(response.data.rollno);
            setBranch(response.data.branch);
            setYear(response.data.year);
            setCgpa(response.data.cgpa);
            setAttendance(response.data.attendance);
            setSkills(response.data.skills);
            setExpertise(response.data.expertise);
            setCertificate(response.data.certificates);
            console.log(certificates[0]);
            setProjects(response.data.projects);
            setAwards(response.data.awards);
            setPapers(response.data.papers);
            setLeetcode(response.data.leetcode);
            setCodechef(response.data.codechef);
            setLeetcodeCount(parseInt(response.data.leetcodeCount));
            setCodechefRating(parseInt(response.data.codechefRating));
            console.log(response.data.leetcode,response.data.codechef);
            
        } catch (error) {
            console.error('Error retrieving form data:', error);
            
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
        <Link className='a-register' to="/register"><button className="registration-button">Registration</button></Link>
            <div className="login-details">
                <div className="user-login">
                    <h2 className="heading-user">User Login</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form className="user-details" onSubmit={handlesubmit}>
                        <label>Username</label>
                        <input type="text" value={id} onChange={handleChange} placeholder="Student Username" />
                        <label>Password</label>
                        <input type="password" value={password} onChange={handlePasschange} placeholder="Student Password" />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login_user;
