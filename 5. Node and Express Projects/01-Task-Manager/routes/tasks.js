const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

// here "/" means  => "/api/v1/tasks"   because in the app.js we are providing it  app.use('/api/v1/tasks',tasks);
router.route("/").get(getAllTasks);
router.route("/").post(createTask);
// The above lines can be done as the following also
// router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);


module.exports = router;
