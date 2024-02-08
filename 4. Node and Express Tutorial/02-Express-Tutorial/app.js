const express = require('express');

const app = express(); // creates a server 

app.get('/' , (req,res) =>{
    console.log('user hit the resource');
    // res.send('Home Page');
    res.status(200).send('Home Page');
})

app.get('/about', (req,res) =>{
    res.status(200).send('About page');
})

app.all('*',(req,res) =>{
    res.status(404).send('<h1> Resource Not Found </h1>');
})

app.listen(5000 , () =>{ // similar to server.listen used in http module
    console.log("server is listening on port 5000");
})

// Different methods that we can use on express app
// app.get -> read data
// app.post -> insert data
// app.put -> update data
// app.delete -> delete data
// app.all
// app.use
// app.listen