/*import React from 'react';


const AboutUs = () => {
    return (
        <div className="content">
            <h2>About Us</h2>
            {/* Add your about us content here }
        </div>
    );
}


export default AboutUs;

*/

import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h2>About Us</h2>
      <p>Welcome to our cab booking service!</p>

      <div className="features-section">
        <h3>Features</h3>
        <ul>
          <li>Easy booking process</li>
          <li>Wide range of vehicles</li>
          <li>24/7 customer support</li>
          <li>Real-time tracking</li>
          <li>Secure payment options</li>
        </ul>
      </div>

      <div className="usp-section">
        <h3>Our USP</h3>
        <p>At our cab booking service, we prioritize customer satisfaction above all else. With our user-friendly platform, diverse vehicle options, and round-the-clock support, we ensure a seamless and enjoyable experience for every journey.</p>
      </div>

      <div className="company-info-section">
        <h3>Company Information</h3>
        <p>Company Name: ABC Cabs</p>
        <p>Address: 123 Main Street, City, Country</p>
        <p>Email: info@abccabs.com</p>
        <p>Phone: +123 456 7890</p>
      </div>
    </div>
  );
}

export default AboutUs;
