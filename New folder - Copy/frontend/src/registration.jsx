import React, { useState } from "react";
import './registration.css'
import axios from "axios";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Registration() {
    const [certificates, setCertificates] = useState([{ name: "", link: "" }]);
    const [projects, setProjects] = useState([{ name: "", link: "" }]);
    const [papers, setPapers] = useState([{ name: "", link: "" }]);
    const [awards, setAwards] = useState([{ name: "", link: "" }]);
    const navigate = useNavigate();

    const handleAddCertificate = () => {
        setCertificates([...certificates, { name: "", link: "" }]);
    };

    const handleCertificateChange = (e, index, field) => {
        const updatedCertificates = [...certificates];
        updatedCertificates[index][field] = e.target.value;
        setCertificates(updatedCertificates);
    };

    const handleAddProject = () => {
        setProjects([...projects, { name: "", link: "" }]);
    };

    const handleProjectChange = (e, index, field) => {
        const updatedProjects = [...projects];
        updatedProjects[index][field] = e.target.value;
        setProjects(updatedProjects);
    };

    const handleAddPaper = () => {
        setPapers([...papers, { name: "", link: "" }]);
    };

    const handlePaperChange = (e, index, field) => {
        const updatedPapers = [...papers];
        updatedPapers[index][field] = e.target.value;
        setPapers(updatedPapers);
    };

    const handleAddAward = () => {
        setAwards([...awards, { name: "", link: "" }]);
    };

    const handleAwardChange = (e, index, field) => {
        const updatedAwards = [...awards];
        updatedAwards[index][field] = e.target.value;
        setAwards(updatedAwards);
    };

    const [name, setName] = useState("");
    const handlename = (e) => {
        setName(e.target.value);
    }

    const [registrationNumber, setRegistrationNumber] = useState("");
    const handlereg = (e) => {
        setRegistrationNumber(e.target.value);
    }

    const [branch, setBranch] = useState("");
    const handlebranch = (e) => {
        setBranch(e.target.value);
    }

    const [year, setYear] = useState("");
    const handleyear = (e) => {
        setYear(e.target.value);
    }

    const [cgpa, setCgpa] = useState("");
    const handlecgpa = (e) => {
        setCgpa(e.target.value);
    }

    const [attendance, setAttendance] = useState("");
    const handleattendance = (e) => {
        setAttendance(e.target.value);
    }

    const [skills, setSkills] = useState("");
    const handleskills = (e) => {
        setSkills(e.target.value);
    }

    const [expertise, setExpertise] = useState("");
    const handleexpertise = (e) => {
        setExpertise(e.target.value);
    }

    const [leetcode, setLeetcode] = useState("");
    const handleleet = (e) => {
        setLeetcode(e.target.value);
    }

    const [codechef, setCodechef] = useState("");
    const handlechef = (e) => { 
        setCodechef(e.target.value);
    }

    const [codeforce, setCodeforce] = useState("");
    const handleforce = (e) => {
        setCodeforce(e.target.value);
        console.log(codeforce);
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
    
        const skillslist = skills.split(',');
        const expertiselist = expertise.split(',');
    
        const certificatesList = certificates.map(cert => ({ name: cert.name, link: cert.link }));
        const projectsList = projects.map(proj => ({ name: proj.name, link: proj.link }));
        const awardsList = awards.map(award => ({ name: award.name, link: award.link }));
        const papersList = papers.map(paper => ({ name: paper.name, link: paper.link }));
    
        const values = {
            name: name,
            rollno: registrationNumber,
            branch: branch,
            year: year,
            cgpa: cgpa,
            attendance: attendance,
            skills: skillslist,
            expertise: expertiselist,
            leetcode: leetcode,
            codechef: codechef,
            codeforce: codeforce,
            certificates: certificatesList,
            projects: projectsList,
            papers: papersList,
            awards: awardsList
        };
    
        try {
            const response = await axios.post('http://localhost:8001/form', values);
            console.log('Response:', response.data);
            navigate('/login/user');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    




    return (
        <>
        <div className="root-registration">
            <div className="registration">
                <h1 className="title">Registration Form</h1>
                <div className="full-details">
                    <form onSubmit={handlesubmit}>
                        {/* Academic Details */}
                        <div className="academic-details">
                            <h2 className="sub-title">Academic Details</h2>
                            <div className="form-group">
                                <label className="label">Name</label>
                                <input name="name" onChange={handlename} type="text" placeholder="Enter your name" />
                            </div>
                            <div className="form-group">
                                <label className="label">Registration Number</label>
                                <input name="registrationNumber" onChange = {handlereg} type="text" placeholder="Enter your registration number" />
                            </div>
                            <div className="form-group">
                                <label className="label">Branch</label>
                                <input name="branch" onChange={handlebranch} type="text" placeholder="Enter your branch" />
                            </div>
                            <div className="form-group">
                                <label className="label">Year</label>
                                <input name="year" onChange={handleyear} type="text" placeholder="Enter your year" />
                            </div>
                            <div className="form-group">
                                <label className="label">CGPA</label>
                                <input name="cgpa" onChange ={handlecgpa} type="text" placeholder="Enter your CGPA" />
                            </div>
                            <div className="form-group">
                                <label className="label">Attendance</label>
                                <input name="attendance" onChange={handleattendance} type="text" placeholder="Enter your attendance" />
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="skills">
                            <h2 className="sub-title">Skills</h2>
                            <div className="form-group">
                                <label className="label">Skills</label>
                                <input name="skills" onChange = {handleskills} className="skill" type="text" placeholder="Enter your skills" />
                            </div>
                            <div className="form-group">
                                <label className="label">Expertise</label>
                                <input name="expertise" onChange={handleexpertise} className="skill" type="text" placeholder="Enter your Expertise" />
                            </div>
                        </div>

                        {/* Coding Platforms */}
                        <div className="coding-platforms">
                            <h2 className="sub-title">Coding Platforms</h2>
                            <div className="form-group">
                                <label className="label">Leetcode</label>
                                <input name="leetcode" onChange={handleleet} type="text" placeholder="Enter your link" />
                            </div>
                            <div className="form-group">
                                <label className="label">Codechef</label>
                                <input name="codechef" onChange={handlechef} type="text" placeholder="Enter your link" />
                            </div>
                            <div className="form-group">
                                <label className="label">Codeforce</label>
                                <input name="codeforce" onChange={handleforce} type="text" placeholder="Enter your link" />
                            </div>
                        </div>


                        {/* Certificates */}
                        <div id="dynamic-certificates">
                            <h2 className="sub-title">Certificates</h2>
                            {certificates.map((certificate, index) => (
                                <div className="form-group" key={index}>
                                    <label className="label">Certificate</label>
                                    <input
                                        name="#"
                                        type="text"
                                        placeholder="Enter organization name"
                                        value={certificate.org}
                                        onChange={(e) => handleCertificateChange(e, index, "name")}
                                    />
                                    <input
                                        name="#"
                                        type="text"
                                        placeholder="Enter your link"
                                        value={certificate.link}
                                        onChange={(e) => handleCertificateChange(e, index, "link")}
                                    />
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={handleAddCertificate} className="submit-button">Add Certificate</button>

                        {/* Projects */}
                        <div id="dynamic-projects">
                            <h2 className="sub-title">Projects</h2>
                            {projects.map((project, index) => (
                                <div className="form-group" key={index}>
                                    <label className="label">Project</label>
                                    <input
                                        name="#"
                                        type="text"
                                        placeholder="Enter project name"
                                        value={project.name}
                                        onChange={(e) => handleProjectChange(e, index, "name")}
                                    />
                                    <input
                                        name="#"
                                        type="text"
                                        placeholder="Enter your link"
                                        value={project.link}
                                        onChange={(e) => handleProjectChange(e, index, "link")}
                                    />
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={handleAddProject} className="submit-button">Add Project</button>

                        {/* Papers */}
                        <div id="dynamic-paper">
                            <h2 className="sub-title">Papers</h2>
                            {papers.map((paper, index) => (
                                <div className="form-group" key={index}>
                                    <label className="label">Paper</label>
                                    <input
                                        name="#"
                                        type="text"
                                        placeholder="Enter paper name"
                                        value={paper.name}
                                        onChange={(e) => handlePaperChange(e, index, "name")}
                                    />
                                    <input
                                        name="#"
                                        type="text"
                                        placeholder="Enter your link"
                                        value={paper.link}
                                        onChange={(e) => handlePaperChange(e, index, "link")}
                                    />
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={handleAddPaper} className="submit-button">Add Paper</button>

                        {/* Awards */}
                        <div id="dynamic-award">
                            <h2 className="sub-title">Awards</h2>
                            {awards.map((award, index) => (
                                <div className="form-group" key={index}>
                                    <label className="label"    >Award</label>
                                    <input
                                        name="#"
                                        type="text"
                                        placeholder="Enter award name"
                                        value={award.name}
                                        onChange={(e) => handleAwardChange(e, index, "name")}
                                    />
                                    <input
                                        name="#"
                                        type="text"
                                        placeholder="Enter your link"
                                        value={award.link}
                                        onChange={(e) => handleAwardChange(e, index, "link")}
                                    />
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={handleAddAward} className="submit-button">Add Award</button>

                        {/* Submit */}
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Registration;