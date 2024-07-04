const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const nodemailer = require('nodemailer');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webapi-88a91-default-rtdb.firebaseio.com"
});

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    
    service: 'gmail',
    auth: {
        user: 'devpatel1828king@gmail.com',
        pass: 'hxzkyawmduixcluh'
    }});

async function sendOTPByEmail(email, otp) {
  const mailOptions = {
    from: 'devpatel1828king@gmail.com', // Sender email
    to: email,
    subject: 'Your OTP for Verification',
    text: `Your OTP for GoRide  is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}

app.post('/api/passenger_data', async (req, res) => {
  const formData = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
  console.log('Generated OTP:', otp);

  // Store form data in Firebase Realtime Database
  admin.database().ref('passenger_details').push(formData)
    .then(() => {
      sendOTPByEmail(formData.email, otp); // Send OTP to the email provided in the form
      
      // Store email and OTP in the "OTP" collection
      admin.database().ref('OTP').push({
        email: formData.email,
        otp: otp
      });

      res.status(200).send('Form data saved successfully');
    })
    .catch((error) => {
      res.status(500).send('Error saving form data: ' + error.message);
    });
});

app.post('/api/otp-verified', async (req, res) => {
  const email = req.body.email; // Assuming the email is sent in the request body as { email: 'abc@gmail.com' }
  const db = admin.database();
  const ref = db.ref('passenger_details');

  ref.orderByChild('email').equalTo(email).once('value', (snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        const otp = userData.otp; // Accessing the OTP field from the node
        // console.log('OTP for Status for :', email, "is ", otp);
        if (otp == "not verified"){
          childSnapshot.ref.update({ otp: 'verified' }, (error) => {
            if (error) {
              console.error('Failed to update OTP status:', error);
              res.status(500).send('Failed to update OTP status');
            } else {
              // console.log('OTP status updated to verified');
              res.status(200).send('OTP status updated to verified');
            }
          });
  
        }
        // Update the OTP status to 'verified'
      });
    } else {
      // console.log('No user found with email:', email);
      res.status(404).send('No user found with the provided email');
    }
  });
});  
  
  
app.post('/api/user_profile', async (req, res) =>{
  const email = req.body.email;
  const db = admin.database();
  const ref = db.ref('passenger_details');
  ref.orderByChild('email').equalTo(email).once('value', (snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
         const userData = childSnapshot.val();
         const userName = userData.name.charAt(0).toUpperCase();
         res.send(userName);
         
        })
        
      }
     else {
      
      res.status(404).send('No user found with the provided email');
    }
  });
  
});



app.post('/api/get-passenger-data', async (req, res) => {
  const { user_email } = req.body;
  const db = admin.database();
  const ref = db.ref('passenger_details');

  try {
    const snapshot = await ref.orderByChild('email').equalTo(user_email).once('value');
    const data = snapshot.val();

    if (!data) {
      res.send("Not Found");
    }

    const passengerData = Object.values(data).map(record => ({
      name: record.name,
      email: record.email,
      password: record.password,
      phoneNumber: record.phoneNumber,
      otp: record.otp
    }));
    
    res.send(passengerData); // Sending the extracted data
  } catch (error) {
    console.error('Error fetching passenger data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



app.listen(3000, () => {
  console.log(`Server running on port http://localhost:3000/api/passenger_data`);
});
