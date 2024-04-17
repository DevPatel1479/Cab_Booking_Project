import React, { useState, useEffect } from 'react';
function App() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  // Function to handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  // Function to handle timer countdown
  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(countdown);
  }, [timer]);
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>OTP Verification</h1>
      <p style={styles.text}>Please enter the OTP sent to your mobile number.</p>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOtpChange}
          style={styles.input}
        />
      </div>
      <p style={styles.text}>Time remaining: {timer} seconds</p>
    </div>
  );
}
const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '10px',
  },
  text: {
    margin: '10px 0',
  },
  inputContainer: {
    margin: '20px 0',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
};
export default App;