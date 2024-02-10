const express = require('express')
const app = express();
const logger = require('./logger');
const authorize = require('./authorize');

//  req => middleware => res
app.use([logger,authorize]);
// app.use(logger); // adding a middleware to all routes
// app.use will invoke that function passed inside for any route
// The order of code where we are placing the app.use matters.
// we can provide a other argument which is the path => app.use('/api',logger);
// the logger will be applied to all routes with api , in our case api/products and api/items
// if we did not pass the path then it is going to applied for all our paths

app.get("/" ,(req,res) =>{
    res.send("Home");
})
app.get("/about",(req,res) =>{
    res.send("About"); 
})
app.get("/api/products",(req,res) =>{
    res.send("Products"); 
})
app.get("/api/items",(req,res) =>{
    res.send("Items"); 
})
app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

