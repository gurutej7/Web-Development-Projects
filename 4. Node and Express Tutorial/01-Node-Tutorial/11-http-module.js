const http = require('http');

const server = http.createServer( (req,res) =>{
    // req is the request object , which is coming from the client to the server
    // it has large information about the request
    // res is also an object , response is what we are sending to the respective request
    if(req.url === '/') res.write("Home Page");
    else if(req.url === '/about') res.write("About page");
    else if(req.url === '/contact') res.write("Contact Page");
    else res.write("Oops , we dont have what u are looking for");
    res.end();
})


server.listen(5000); // port