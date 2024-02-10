const express = require('express')
const app = express()

//  req => middleware => res

const logger = (req,res,next) =>{ // even though we are not passing req and res express will supply them
    const method =req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method,url,time);
    // res.send("Testing");
    next(); // really important , if not added here then we will never be able to access that req , to send the response
    // unless we are sending back the response , we should keep on passing it to the next middleware
}

app.get("/" ,logger,(req,res) =>{
    res.send("Home");
})
app.get("/about",logger,(req,res) =>{
    res.send("About"); // output:  GET /about 2024
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

