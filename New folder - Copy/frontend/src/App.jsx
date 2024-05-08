import { useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import Registration from './registration';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Popup_paper from './pages/popup-paper';
import Popup_award from './pages/popup-award';
import Popup_project from './pages/popup-project';
import Popup_certificate from './pages/popup-certificate';
// import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const { username } = location.state;
  
  const [name ,setName] = useState("");
  const [rollno ,setRollno] = useState("");
  const [branch ,setBranch] = useState("");
  const [year ,setYear] = useState("");
  const [cgpa ,setCgpa] = useState("");
  const [attendance ,setAttendance] = useState("");
  const [skills ,setSkills] = useState([]);
  const [expertise ,setExpertise] = useState([]);
  const [certificates ,setCertificate] = useState([]);
  const [projects ,setProjects] = useState([]);
  const [awards ,setAwards] = useState([]);
  const [papers ,setPapers] = useState([]);
  const [responsedata , setResponseData] = useState([]);
  const [leetcode ,setLeetcode] = useState();
  const [codechef , setCodechef] = useState();
  const [search , setSearch] = useState("");
  const [leetcodeCount, setLeetcodeCount] = useState(0);
  const [codechefRating, setCodechefRating] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      let codechefLink = codechef;
      let leetcodeLink = leetcode;
        const response = await axios.get(`http://localhost:8000/hello?codechef_link=${codechefLink}&leetcode_link=${leetcodeLink}`);
        console.log(response.data);
        setResponseData(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


  const handleSearch = async(e)=>{ 
        // e.preventDefault();
        
        try {
            const response = await axios.get(`http://localhost:8001/form?rollno=${username}`);
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



const updateData = async () => {
  const leetcodeCount = responsedata.leetcode;
  const codechefRating = responsedata.codechef;
  console.log(leetcodeCount,codechefRating);
  try {
    const response = await fetch('http://localhost:8001/formupdate', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({
        leetcodeCount,
        codechefRating,
        rollno: rollno, // Replace 'your_roll_number_here' with the actual roll number
      }),
    });
    setLeetcodeCount(leetcodeCount);
    setCodechefRating(codechefRating);
    const data = await response.json();
    console.log(data); // Handle response data as needed
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

const refresh = async () => {
  await fetchData();
  console.log(responsedata.leetcode);
  console.log(responsedata.codechef);
  // setLeetcodeCount(parseInt(responsedata.leetcode));
  // setCodechefRating(parseInt(responsedata.codechef));
  await updateData();

};


const handlesinput = (e)=>{
    let nsearch = e.target.value;
    setSearch(nsearch);
}

const handlelogoout = () => {
  navigate('/');
}

useEffect( () => {
  // This code will run when the component mounts (i.e., when the window loads)
  // You can perform any initial setup or fetch data here
  handleSearch();
}, []); 


  return (
    <>
    <div className="root">
      <div className="dashboard">
        <div className='user-line'>
          <div className='user-name'>
            {name}
          </div>
          {/* <div className="search-box">
            <input type="text" value={search} onChange={handlesinput} placeholder="Search" />
            <button onClick={handleSearch}>Search</button>
          </div> */}
          <div className="user-actions">
            <button className="logout-button" onClick={handlelogoout}>Logout</button>
          </div>
        </div>
{/* user-details */}
        <div className="user-container">
          <div className="user-box">
            <table>
              <tr>
                <td>Reg No :</td>
                <td>{rollno}</td>
              </tr>
              <tr>
                <td>Branch :</td>
                <td>{branch}</td>
              </tr>
              <tr>
                <td>Year :</td>
                <td>{year}</td>
              </tr>
              <tr>
                <td>CGPA :</td>
                <td>{cgpa}</td>
              </tr>
              <tr>
                <td>Attendance :</td>
                <td>{attendance}</td>
              </tr>
            </table>
          </div>
          <div className="skill-box">
            <h3 className='platform-name'>Skills</h3>
            <div className='skill'>
              {
                skills.map((skill, index)=>{
                  return(
                    <h4 key={index}>{skill}</h4>
                  )
                })
              }
            </div>
          </div>
          <div className="expert-box">
            <h3 className='platform-name'>Expertise</h3>
            <div className='expertise'>
              {
                expertise.map((expertise, index)=>{
                  return(
                    <h4 key={index}>{expertise}</h4>
                  )
               })
              }
            </div>
          </div>
        </div>
{/* coding platform */}
        <div className='coding-platforms-container'>
          <div className="coding-box">
            <h3 className='platform-name' onClick={refresh}>Leetcode</h3>
            <div className='count'>
              <a href={leetcode} target='_blank'><h4>{leetcodeCount}</h4></a>
            </div>
          </div>
          <div className="coding-box">
            <h3 className='platform-name'>Codechef</h3>
            <div className='count'>
              <a href={codechef} target='_blank'><h4>{codechefRating}</h4></a>
            </div>
          </div>
          {/* <div className="coding-box">
            <h3 className='platform-name'>Codeforce</h3>
            <div className='count'>
              <p>Nil</p>
            </div>
          </div> */}
        </div>
{/* certificates */}
        <div className="certificate-container">
          <div className="certificate-box">
            <div className='platform-name'>Certificates</div>
            <div className='certificates'>
              <table>
                {
                  certificates.map((certificate,index) =>{
                  return (<tr>
                    <td>{certificate.name}</td>
                    <td><a href={certificate.link} target='_blank'>link</a></td>
                  </tr>)
                  })
                }
              </table>
            </div>
            {/* <div className='add-certificates'><Popup_certificate /></div> */}
          </div>
        </div>
{/* projects */}
        <div className="project-container">
          <div className="project-box">
            <h3 className='platform-name'>Projects</h3>
            <div className='project'>
                {
                  projects.map((project,index) =>{
                  return (
                    <>
                    <a href={project.link} target='_blank'><h4>{project.name}</h4></a>
                    
                    </>)
                  })
                }
            </div>
            {/* <div className="add-project"><Popup_project /></div> */}
          </div>
        </div>
{/* award */}
        <div className='award-container'>
          <div className="award-box">
            <h3 className='platform-name'>Awards</h3>
            <div className='award'>
                {
                  awards.map((award,index) =>{
                  return (
                    <>
                    <a href={award.link} target='_blank'><h4>{award.name}</h4></a>
                    </>)
                  })
                }
            </div>
            {/* <div className='add-award'><Popup_award /></div> */}
          </div>
        </div>
{/* paper published */}
        <div className="paper-published-container">
          <div className="paper-published-box">
            <h3 className='platform-name'>Paper-Published</h3>
            <div className='paper-published'>
                {
                  papers.map((paper,index) =>{
                  return (
                    <>
                    <a href={paper.link} target='_blank'><h4>{paper.name}</h4></a>
                    </>
                  )
                  })
                }
            </div>
            {/* <div className='add-paper'><Popup_paper /></div> */}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App;
