const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3030;
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

app.use(cors());
app.use(bodyParser.json());  // Added this line to parse JSON body

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webapi-88a91-default-rtdb.firebaseio.com"
});

const db = admin.database();

app.post('/profile-data', async (req, res) => {
    const { email } = req.body; // Destructure email from request body
    console.log(email);
    try {
        const ref = db.ref("passenger_details");
        const snapshot = await ref.once('value');
        const data = snapshot.val();
        
        let found = false;
        for (const key in data) {
            if (data[key].email === email) {
                console.log(data[key]);
                res.status(200).send(data[key]);
                found = true;
                break;
            }
        }
    
        if (!found) {
            res.status(404).send('Email not found.');
        }
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).send('Internal server error.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
