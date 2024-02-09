const express = require('express');

const app = express();
const path = require('path'); // to provide the absolute path
// all the static assets are placed in the public folder
// setup static and middleware
app.use(express.static('./public')); // if a request is made express will automaticall fetch that resource from the above mentioned file

// static files are those files which we won`t(server) be changing dynamically inside the file 
// for example image file , style file etc.

app.get('/' , (req,res) =>{
    res.sendFile(path.resolve(__dirname,"./navbar-app/index.html"));
    // we can comment the above line also and move index.tml to public folder
    // because it is also a static
    // when the page is loaded the express will automatically search for file named index.html and loads it.
    // the name should be index.html only
    // here we are not handling requests that are made by the index.html file 
    // instead we are going to keep those files in folder called public
    // the name can be ending , but using public is a general practice
})
// for all requests for which we don`t created  a response
app.all('*' , (req,res) =>{
    res.status(404).send("resource not found");
})

app.listen(5000, ()=>{
    console.log("server listening at port 5000");
})