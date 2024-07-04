import React from 'react';

function DocumentUploadForm() {
  const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const formGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const textareaStyle = {
    width: '100%',
    height: '100px',
    padding: '10px',
    marginTop: '5px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
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
      <h2>Document Upload Form</h2>
      <form method="post" encType="multipart/form-data">
        <div style={formGroupStyle}>
          <label htmlFor="license" style={labelStyle}>Driver's License (with clear expiry date):</label>
          <input type="file" id="license" name="license" accept="image/*" style={inputStyle} required />
          <input type="date" id="licenseExpiry" name="licenseExpiry" placeholder="Expiry Date" style={inputStyle} required />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="registration" style={labelStyle}>Vehicle Registration Certificate:</label>
          <input type="file" id="registration" name="registration" accept="image/*" style={inputStyle} required />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="insurance" style={labelStyle}>Vehicle Insurance Details:</label>
          <input type="file" id="insurance" name="insurance" accept="image/*" style={inputStyle} required />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="identity" style={labelStyle}>Proof of Identity:</label>
          <input type="file" id="identity" name="identity" accept="image/*" style={inputStyle} required />
          <input type="text" id="identityType" name="identityType" placeholder="Type of ID (e.g., Aadhaar card, PAN card, Passport, etc.)" style={inputStyle} required />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="comments" style={labelStyle}>Additional Comments or Notes:</label>
          <textarea id="comments" name="comments" style={textareaStyle}></textarea>
        </div>
        <button type="submit" style={buttonStyle} onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}>Next</button>
      </form>
    </div>
  );
}

export default DocumentUploadForm;
