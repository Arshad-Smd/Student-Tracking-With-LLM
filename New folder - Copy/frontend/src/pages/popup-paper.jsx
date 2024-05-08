import React, { useState } from 'react';
import './Popup.css'; // Import CSS for styling

function Popup_paper() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="popup-container">
      <button className='add-btn' onClick={togglePopup}><i class='bx bx-list-plus'></i></button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>&times;</span>
            <label className='label'>Paper</label><br />
            <input type="text" placeholder='paper name'></input>
            <input type="text" placeholder='paper link'></input><br/>
            <button onClick={togglePopup}>submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup_paper;
