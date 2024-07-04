const express = require('express');
const app = express();

app.use(express.json());

function getQueryData(req, res){
    const {email, rollno} =  req.query;
    res.write("<br></br>");
    res.write(email);
    res.write("<br>");
    res.write(rollno);

}



app.get('/api/sendData', (req, res)=>{
    res.writeHead(200, {'Content-Type' : 'text/html'});
    const {email, rollno} = req.query;
    
    res.write(`<button onclick=${getQueryData(req, res)}>Click me</button>`);
    res.end();
});

app.listen(3000, ()=>{
    console.log("Server is listening on http://localhost:3000");
});
