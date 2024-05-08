import React, { useState } from "react";
// import { FiSend } from "react-icons/fi";
import "../styles-pages/Admin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
    const [text, setText] = useState('');
    const [Query, setQuery] = useState('');
    const [lst,setlst] = useState([]);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setText(event.target.value);
        const textarea = event.target;
        textarea.style.height = '40px';
        if (textarea.scrollHeight > 60) {
            textarea.style.height = '60px';
            textarea.style.overflowY = 'auto'; 
        } else {
            textarea.style.height = `${Math.min(textarea.scrollHeight, 60)}px`; 
            textarea.style.overflowY = 'hidden';
        }
    };
    const fetch = async ()=>{
        const response = await axios.get(`http://localhost:8000/llm?query=${text}`);
        let data = response.data.query;
        console.log(data);
        await setQuery(data);
        console.log(data);
    }

    const handleSend = async () => {

        console.log('Message sent:', text);
        // await fetch();
        setText('');
        const res = await axios.get(`http://localhost:8000/llm?query=${text}`);
        let data = res.data.query;
        console.log(data);
        const response = await axios.get(`http://localhost:8001/custom?query=${data}`);
        setQuery('');
        console.log(response.data);
        setlst(response.data);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSend();
        }
    };

    const handleclick = ()=>{
        window.print();
    }

    const handlelogout = () => {
        navigate('/');
    }

    return (
        <div className="admin-container">
            {/* <div className="left-side">
                    <p>admin-name</p>
            </div> */}
            <div className="right-side">
                <div className="right-side-top">
                    <button className="print-btn" onClick={handleclick}><i class='bx bx-printer' ></i></button>
                    <button className="logout-btn" onClick={handlelogout}><i className='bx bx-log-out'></i></button>
                </div>
                <div className="right-side-bottom">
                <div className="right-side-bottom-display print-only">
                    <div className="std-details-heading-container">
                        <table className="std-details-heading">
                            <thead>
                                <tr>
                                    <th>S.NO</th>
                                    <th>Reg.No</th>
                                    <th>Name</th>
                                    <th>Branch</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="std-details-data-container-full">
                    {
                        lst.map((item , index)=>{
                            return (
                                
                                <div key={index} className="std-details-data-container">
                            <table className="std-details-data print-only">
                                <tbody>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.rollno}</td>
                                        <td className="name">{item.name}</td>
                                        <td>{item.branch}</td>
                                        <td>{item.year}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                                
                            )
                        })
                    }
                        
                        
                    </div>
                </div>
                    <div className="right-side-bottom-search-container no-print">
                        <div className="right-side-bottom-search">
                            <textarea
                                name="aisearch"
                                id="aisearch"
                                value={text}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message here..."
                            />
                            <button className="send-button" onClick={handleSend} style={{ marginRight: '5px' }}>
                            <i class='bx bx-send'></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
