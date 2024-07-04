const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webapi-88a91-default-rtdb.firebaseio.com"
});

const app = express();
app.use(express.json());

// Define your API endpoint to insert data
app.get("/api/insertData/", (req, res) => {
  const { name, age } = req.query; // Use req.query to get query parameters
  const db = admin.database();
  const ref = db.ref(`collections/users/${name}`);
  ref.set({ age })
    .then(() => {
      // Data to be inserted
      const newData = {
          document : "document-1",
          name: "John",
          age: 30
        
        // Add more documents as needed
      };

      // Insert the data
      ref.set(newData)
        .then(() => {
          res.status(200).json({ message: "Data inserted successfully" });
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});


const port = 3005;
app.listen(port,'localhost',  () => {
  d_name = "Document_";
  age = 25;
  console.log(`Server is running on port https://localhost:${port}/api/insertData?name=&age=`);
});
