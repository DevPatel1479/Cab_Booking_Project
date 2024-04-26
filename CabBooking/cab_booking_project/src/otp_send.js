import React, { useEffect, useRef, useState } from 'react';
import firebase from './firebase';
import 'firebase/auth';


const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyCcdVnAjkio5WIqPYeTQexER0QgdIhnh1M",
  authDomain: "webapi-88a91.firebaseapp.com",
  databaseURL: "https://webapi-88a91-default-rtdb.firebaseio.com",
  projectId: "webapi-88a91",
  storageBucket: "webapi-88a91.appspot.com",
  messagingSenderId: "102122774240",
  appId: "1:102122774240:web:aedee404a652e9d8cdfa85",
  measurementId: "G-88KQJJH4MV"
};

const App = () => {
  const [mobile, setMobile] = useState('');
  const recaptchaContainerRef = useRef(null);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptchaContainerRef.current, {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("Recaptcha verified");
      },
      defaultCountry: "IN"
    });
  }, []);

  const onSignInSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "+91" + mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((result) => {
        console.log("OTP has been sent");
        // handle success
      }).catch((error) => {
        console.error("SMS not sent", error);
        // handle error
      });
  }

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={onSignInSubmit}>
        <div ref={recaptchaContainerRef}></div>
        <input type="number" name="mobile" placeholder="Mobile number" required value={mobile} onChange={(e) => setMobile(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App;
