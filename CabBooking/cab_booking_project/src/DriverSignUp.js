/*import React, { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    email: '',
    driversLicense: '',
    vehicleRegistration: '',
    vehicleInsurance: '',
    proofOfIdentity: '',
    makeModelYear: '',
    vehicleType: '',
    vehicleColor: '',
    licensePlateNumber: '',
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    consentForBackgroundChecks: false,
    previousDrivingExperience: '',
    vehicleInspectionCertificate: '',
    commercialDrivingLicense: '',
    vehiclePermit: '',
    proofOfVehicleOwnership: '',
    agreementToTerms: false,
    profilePicture: null,
    emergencyContact: '',
    references: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Driver Sign Up</h2>

      {/* Personal Information }
      <label>
        Full Name:
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
      </label>
      {/* Add other personal information fields similarly }

      {/* Identification Documents }
      <label>
        Driver's License:
        <input type="text" name="driversLicense" value={formData.driversLicense} onChange={handleChange} required />
      </label>
      {/* Add other identification document fields similarly }

      {/* Vehicle Information }
      <label>
        Make, Model, and Year of the Vehicle:
        <input type="text" name="makeModelYear" value={formData.makeModelYear} onChange={handleChange} required />
      </label>
      {/* Add other vehicle information fields similarly }

      {/* Bank Account Details }
      <label>
        Account Holder's Name:
        <input type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} required />
      </label>
      {/* Add other bank account detail fields similarly }

      {/* Background Check Information }
      <label>
        Consent for Background Checks:
        <input type="checkbox" name="consentForBackgroundChecks" checked={formData.consentForBackgroundChecks} onChange={handleChange} />
      </label>
      {/* Add other background check information fields similarly }

      {/* Agreement to Terms and Conditions }
      <label>
        <input type="checkbox" name="agreementToTerms" checked={formData.agreementToTerms} onChange={handleChange} required />
        I agree to the Terms and Conditions
      </label>

      {/* Optional Information }
      <label>
        Profile Picture:
        <input type="file" name="profilePicture" onChange={handleChange} />
      </label>
      {/* Add other optional information fields similarly}

      {/* References }
      <label>
        References:
        <textarea name="references" value={formData.references} onChange={handleChange}></textarea>
      </label>
      {/* Add other references fields similarly }

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUpForm;
*/
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function LoginPage() {
  useEffect(() => {
    AOS.init({ duration: 9000 });
  }, []);

  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Phone number submitted:', phoneNumber);
    setPhoneNumber('');
  };

  return (
    <div className="content">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          data-aos="fade-up"
        />
        <button type="submit" data-aos="fade-up">Submit</button>
      </form>
    </div>
  );
}
export default LoginPage;