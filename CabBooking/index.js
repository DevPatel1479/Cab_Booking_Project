const http = require('http');

const obj = {
    "Name" : "John",
    "Roll no" : 25
}

// const content = "Welcome to the Server !!!";
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(JSON.stringify(obj)); // Use ${} to include the variable content
    
    res.end('Server reponded with 200 status code');
});

const port = 4040;

server.listen(port, () => {
    console.log('Server running at http://localhost:' + port); // Use + to concatenate the port variable
});

