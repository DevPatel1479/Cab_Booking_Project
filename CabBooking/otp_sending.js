const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://webapi-88a91-default-rtdb.firebaseio.com'
});

const phoneNumber = '+1234567890'; // Replace with the user's phone number
admin.auth().
// Send SMS OTP using Firebase Phone Authentication
admin.auth().getUserByPhoneNumber(phoneNumber)
  .then((userRecord) => {
    // User found, send SMS OTP
    return admin.auth().updateUser(userRecord.uid, {
      phoneNumber: phoneNumber
    });
  })
  .then(() => {
    console.log('SMS OTP sent to:', phoneNumber);
  })
  .catch((error) => {
    console.error('Error sending SMS OTP:', error);
  });
