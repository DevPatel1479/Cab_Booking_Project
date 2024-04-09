import React, { useState } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCcdVnAjkio5WIqPYeTQexER0QgdIhnh1M",
    authDomain: "webapi-88a91.firebaseapp.com",
    databaseURL: "https://webapi-88a91-default-rtdb.firebaseio.com",
    projectId: "webapi-88a91",
    storageBucket: "webapi-88a91.appspot.com",
    messagingSenderId: "102122774240",
    appId: "1:102122774240:web:aedee404a652e9d8cdfa85",
    measurementId: "G-88KQJJH4MV"
  
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOTP = async () => {
    try {
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
      setMessage('OTP sent to your phone.');
    } catch (error) {
      console.error(error);
      setMessage('Failed to send OTP. Please try again.');
    }
  };

  return (
    <div>
      <h1>Phone Number Authentication</h1>
      <div id="recaptcha-container"></div>
      <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button onClick={handleSendOTP}>Send OTP</button>
      <p>{message}</p>
      <p></p>
    </div>
  );
};

export default App;