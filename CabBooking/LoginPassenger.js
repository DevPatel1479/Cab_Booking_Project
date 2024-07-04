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
    subject: 'Your OTP for Login to GoRide',
    text: `Your OTP for is: ${otp}`
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}


app.post('/api/login', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
    console.log('Generated OTP:', otp);
  
    const user_email = email.replace(/[^a-zA-Z0-9]/g, '');
  
    const ref = admin.database().ref('passenger_details');
    ref.once('value', (snapshot) => {
      let found = false;
      snapshot.forEach((childSnapshot) => {
        let data = childSnapshot.val();
        let data_email = data.email.replace(/[^a-zA-Z0-9]/g, '');
        
        if (data_email == user_email && data.otp == 'verified') {
          console.log('Email success');
          found = true;
          
        }
      });
  
      if (found &&  sendOTPByEmail(email, otp)) {
        const ref = admin.database().ref('Login_OTP');

        ref.orderByChild('email').equalTo(email).once('value', (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key;
                    ref.child(key).update({ Login_OTP: otp });
                    res.send('Email success');
                });
            } else {
                ref.push({ email: email, Login_OTP: otp }).then(() => {
                    res.send('Email success');
                });
            }
        });
        
      } else {
        res.send('Email failed');
        
      }
  
      // Send OTP to the user's email
     
     
    });
});



app.post('/api/verify-otp-login', async (req, res) => {
    const { otp } = req.body;
    
    const ref = admin.database().ref('Login_OTP');
    
    ref.once('value', (snapshot) => {
        let otpMatched = false;
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const storedOTP = data.Login_OTP;
            
            if (parseInt(storedOTP) == otp) {
                otpMatched = true;
                console.log(data.email);
                res.send(data.email);
            }
        });
        if (!otpMatched) {
            res.send('Failed');
        }
    });
});


app.listen(3005, () => {
    console.log(`Server running on port http://localhost:3005/api/login`);
});