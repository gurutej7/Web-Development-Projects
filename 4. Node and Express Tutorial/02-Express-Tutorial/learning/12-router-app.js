const express = require("express");
const app = express();
const peopleROuter = require('./routes/people');
const loginRouter = require('./routes/auth');



// static assets
app.use(express.static("./methods-public")); // a form page

// middleware to get/parse the form data
app.use(express.urlencoded({ extended: false }));
// middleware to parse json data
app.use(express.json());

app.use('/api/people',peopleROuter);
app.use('/login',loginRouter);


app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
