const Task = require("../models/Task");
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');


const getAllTasks = asyncWrapper(async (req, res) => {
  
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // we have different options in case of sending our response
  // res.status(200).json({tasks , amount : tasks.length})
  // res.status(200).json({status : "success" , data :{tasks , nbHits : tasks.length}})

});
// Example of setting up the functionality using try catch blocks
// But if we use it for every function it feels some what messy
// Alternate approach is using asyncWrapper which is provided by some modules , as it is my 1st project we will set it up from scratch
// in middleware/async.js

// const createTask = async (req, res) => {
//   // res.send("Create a task");
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const createTask = asyncWrapper(async (req, res) => {
  // res.send("Create a task");
  
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  
});

const getTask = asyncWrapper(async (req, res) => {
  // res.send("get a  single task");
  
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {

      return next(createCustomError(`Task not found with the id : ${taskID}`,404));
      // return res
      //   .status(404)
      //   .json({ msg: `Task not found with the id : ${taskID}` });
    }

    res.status(200).json({ task });
  
});

const deleteTask = asyncWrapper(async (req, res) => {
 
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task){
    // if such task does`nt exist
    return next(createCustomError(`Task not found with the id : ${taskID}`,404));
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }

  res.status(200).json({ task }); // we don`t actually need to send the deleted one , but to check the functionality in postman we are sending
  // some other options we can use are as follows
  // res.status(200).send();
  // res.status(200).json({task : null , status : 'success'});

});

const updateTask = asyncWrapper(async (req, res) => {
  
  const { id: taskID } = req.params;
  // we will get the new values for the specified id , through the body.params
  // then we will find that id, and assign these new values
  // const {name:newTaskName,completed : newCompletedStatus} = req.body;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  }); // third parameters provide options , if we don`t pass the options ,
  // even though we have changed the data we will get the old data as the response

  // if there is no such task
  if (!task) {
    return next(createCustomError(`Task not found with the id : ${taskID}`,404));
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }

  res.status(200).json({ task });

  // res.status(200).json({id:taskID,data:req.body});

// res.send("update a task");
});

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
