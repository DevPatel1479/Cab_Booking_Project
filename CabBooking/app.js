const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Path to your Firebase service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://webapi-88a91-default-rtdb.firebaseio.com', // Replace with your Firebase project's database URL
});

// Function to create a new user
async function createUser(email, password) {
  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });
    console.log('Successfully created new user:', userRecord.uid);
    return userRecord.uid;
  } catch (error) {
    console.error('Error creating new user:', error);
    return null;
  }
}

// Function to authenticate a user
async function authenticateUser(email, password) {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return userRecord.uid;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
}

// Example usage
async function exampleUsage() {
  const newUserUid = await createUser('test@example.com', 'password123');
  const authenticatedUserUid = await authenticateUser('test@example.com', 'password123');
  console.log('New user UID:', newUserUid);
  console.log('Authenticated user UID:', authenticatedUserUid);
}

exampleUsage();
