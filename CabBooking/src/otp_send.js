<<<<<<< HEAD
// src/components/DocumentUploadForm.js
import React, { useState } from "react";

import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
// src/firebase.js
import { initializeApp } from "firebase/app";


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

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);



const DocumentUploadForm = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <progress value={progress} max="100" />
      {url && <img src={url} alt="Uploaded file" />}
    </div>
  );
};

export default DocumentUploadForm;
=======
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
>>>>>>> cf496a10d47dfa036521d06d6f5255cbda971068
