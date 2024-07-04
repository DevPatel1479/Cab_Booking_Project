// App.js
import React, { useState } from 'react';
import './user.css'; // Importing CSS file for styling

const App = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-logo">
          <div className="profile-icon" onClick={toggleDropdown}>
            <div className="profile-initial">D</div>
          </div>
          {isDropdownOpen && (
            <div className="dropdown">
              <a href="#">Profile</a>
              <a href="#">Settings</a>
              <a href="#">Payments</a>
              <a href="#">Transaction History</a>
              <a href="#">Devices</a>
              <a href="#">Exit</a>
            </div>
          )}
        </div>
        <div className="navbar-links">
          {/* Add your navbar links here */}
        </div>
      </nav>
      <div className="profile-page">
        <div className="profile-info">
          {/* Add profile information here */}
        </div>
        {/* Add other profile content here */}
      </div>
    </div>
  );
};

export default App;
