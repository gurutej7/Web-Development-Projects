const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// middleware
app.use(express.static('./public'));
app.use(express.json()); // since we will be sending json
// if we don`t use this then we don`t have that data in req.body.

// routes
app.use("/api/v1/tasks", tasks);

app.use(errorHandlerMiddleware);

app.use(notFound); // to handle incorrect routes



// app.get('/api/v1/tasks')         - get all the tasks
// app.post('/api/v1/tasks')        - create a new task
// app.get('/api/v1/tasks/:id')     - get single task
// app.patch('/api/v1/tasks/:id')   - update task
// app.delete('/api/v1/tasks/:id')  - delete task
const port = process.env.PORT || 3000; // set port to environment variable PORT if nothing is there use 3000 

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);// connection string to MongoDB atlas cloud db
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
