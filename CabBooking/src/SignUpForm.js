import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/document-upload');
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const formGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '95%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyle = {
    width: '95%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={containerStyle}>
      <form id="signup-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Driver Sign Up</h2>
        <div style={formGroupStyle}>
          <label htmlFor="first-name" style={labelStyle}>First Name:</label>
          <input type="text" id="first-name" name="first-name" style={inputStyle} required />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="last-name" style={labelStyle}>Last Name:</label>
          <input type="text" id="last-name" name="last-name" style={inputStyle} required />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Email:</label>
          <input type="email" id="email" name="email" style={inputStyle} required />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="password" style={labelStyle}>Password:</label>
          <input type="password" id="password" name="password" style={inputStyle} required />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="phone-number" style={labelStyle}>Phone Number:</label>
          <input type="tel" id="phone-number" name="phone-number" style={inputStyle} required />
        </div>
        <button type="submit" style={buttonStyle} onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}>Next</button>
      </form>
    </div>
  );
}

export default SignUpForm;
