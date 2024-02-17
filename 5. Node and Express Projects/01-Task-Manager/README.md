## Task Manager
* Built a TaskManager App , which supports the basic CRUD operations.
* A user can Create,Read,Update and Delete data.
* This is not a Traditional _Todo_ app , where every thing is stored in local storage.
* This app uses a cloud database for free with _MongoDB Atlas_.
* This Project is a part of the [Tutorial](https://www.youtube.com/watch?v=qwfE7fSVaZM)
* Only Backend was Built from scratch , FrontEnd was provided by the Tutorial creator.
* TechStack -> Node JS , Express JS , MongoDB


### Request and Responses
* `GET`   : app.get('/api/v1/tasks')         - get all the tasks
* `POST`  : app.post('/api/v1/tasks')        - create a new task
* `GET`   : app.get('/api/v1/tasks/:id')     - get single task
* `PATCH` : app.patch('/api/v1/tasks/:id')   - update task
* `DELETE`: app.delete('/api/v1/tasks/:id')  - delete task

#### My Learnings 
* This is my Project using Node and Express , learned how a basic setup for building a API from scratch looks like.
* Learnt about the module - _dotenv_ , _mongoose_ and Collections , models , schema , documents in MongoDB.
* How we can connect our Node application to a cloud database.
* Utilized postman to full extent for testing the routes and their resposes.
* The methods that are provided by mongoose for models , is really amazing makes the interation with database quick and easy.
* Some of the methods used in this project are ,
    1. model.create()
    2. model.find()
    3. model.findOne()
    4. model.findOneAndDelete()
    5. model.findOneAndUpdate()
* There are a lot more , refer [mongoose docs](https://mongoosejs.com/docs/api/model.html)

### Glimps of the app
1. Home Page


![Home Page](/5.%20Node%20and%20Express%20Projects/01-Task-Manager/public/ImagesMD/1%20(1).png)


2. Added tasks


![Tasks Added](/5.%20Node%20and%20Express%20Projects/01-Task-Manager/public/ImagesMD/1%20(2).png)


3. Update page (Directed when clicked on the edit icon on the right side of the task)

![Update Page](/5.%20Node%20and%20Express%20Projects/01-Task-Manager/public/ImagesMD/1%20(3).png)


4. Changes reflected after updating a task 

![Update change view](/5.%20Node%20and%20Express%20Projects/01-Task-Manager/public/ImagesMD/1%20(4).png)


5. Deleted a task (Executed when clicked on the delete icon on the right side of the task)

![Delete a task](/5.%20Node%20and%20Express%20Projects/01-Task-Manager/public/ImagesMD/1%20(5).png)


6. To know more about the frontend logic you can refer the files in the public folder.


_On to the next project now_ 🫡




