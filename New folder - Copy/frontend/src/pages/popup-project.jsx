import React, { useState } from 'react';
import './Popup.css'; // Import CSS for styling

function Popup_project() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectLink, setProjectLink] = useState('');

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    // Here you can handle submission of project details
    console.log('Project Name:', projectName);
    console.log('Project Link:', projectLink);
    // You can perform additional actions like sending data to a server
    // Reset state and close the popup
    setProjectName('');
    setProjectLink('');
    setIsOpen(false);
  };

  return (
    <div className="popup-container">
      <button className='add-btn' onClick={togglePopup}><i className='bx bx-list-plus'></i></button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>&times;</span>
            <label className='label'>Project</label><br />
            <input
              type="text"
              placeholder='Project Name'
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <input
              type="text"
              placeholder='Project Link'
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
            /><br/>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup_project;
