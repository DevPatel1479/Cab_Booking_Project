const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");


const app = express();
const port = 7040;

app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webapi-88a91-default-rtdb.firebaseio.com"
});



const db = admin.database();
const ref = db.ref('driver_details');
app.post('/add-drivers', async (req, res)=>{
    
    ref.push(req.body).then(() => {
        console.log('data added');
        res.status(200).send('driver data added !!');
      })
      .catch((error) => {
        console.error('Error adding data:', error);
        res.status(500).send('Error adding data');
      });

})

app.post('/add-documents', async (req, res)=>{
    const request_body = req.body
    const email = request_body.email;
    const files_url = request_body.files_url;

    // console.log(email, files_url);

  try {
    // Reference to the driver_details collection
    const ref = db.ref('driver_details');

    // Fetch all records
    const snapshot = await ref.once('value');
    const data = snapshot.val();

    // Find the record with the matching email
    let found = false;
    for (const key in data) {
      if (data[key].email === email) {
        // Update the record with files_url
        await ref.child(key).update({ files_url });
        found = true;
        break;
      }
    }

    if (found) {
      res.status(200).send('Document updated successfully.');
    } else {
      res.status(404).send('Email not found.');
    }
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).send('Internal server error.');
  }


})

app.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}/add-drivers`);
})