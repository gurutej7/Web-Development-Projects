## Jobs-API
* To spin up the project in local host.
* create .env file in the root and set-up these variables `MONGO_URI , JWT_SECRET and JWT_LIFETIME` and run the following command in the terminal.
```bash
npm install && npm start
```
#### Key features
* user can register and login, authorization is implemented using with JSON web token and password hasing using bcrptjs.
* user can create,update,get,and delete jobs, only the authorized user`s can perform these requests.
* Utilized the mongoDB altas cloud cluster for database , to access/change data in real time

### Sample request`s and responses
* was not able to provide proper api docs link , because could not able to host it due to hosting charges.
* In the following sample URL`s localhost:port , will be replaced by the domain once the api is hosted on any platform.
* All the routes were tested using postman while developing the api.
#### 1. Register user (POST)
* Input is taken via req.body , frontend has to provide the following details in the req.body.
* URL - localhost:port/api/v1/auth/register
```
{
    "name" : "user",
    "email": "user@gmail.com",
    "password":"123456789"
}
```
* Sample output that the frontend get`s back
```
{
    "user": {
        "name": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3MzZiZWVhYjgwY2RhODRhNmQyMjIiLCJuYW1lIjoidXNlciIsImlhdCI6MTcwOTY1MTY0NiwiZXhwIjoxNzEyMjQzNjQ2fQ.h16h75MIOdj48UqFVwNb0j7SnCr7VmMeEve2yP8yscw"
}
```
* The frontend will takes care of handling the token i.e, saving it to user for futher request`s to routes which require authorizarion.
* If there are any error`s in the input , the corresponding user friendly error msg is sent back.

#### 2. Login user (POST)
* Input is taken via req.body , frontend has to provide the following details in the req.body.
* URL - localhost:port/api/v1/auth/login
```
{
    "email": "user@gmail.com",
    "password":"123456789"
}
```
* Sample output that the frontend get`s back
```
{
    "user": {
        "name": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3MzZiZWVhYjgwY2RhODRhNmQyMjIiLCJuYW1lIjoidXNlciIsImlhdCI6MTcwOTY1MjMxOCwiZXhwIjoxNzEyMjQ0MzE4fQ.EsXFio8MzvA45-DJ5PElsvKh5m5FH0eqrOO13svMwa0"
}
```
* The frontend will takes care of handling the token i.e, saving it to user for futher request`s to routes which require authorizarion.
* If there are any error`s in the input , the corresponding user friendly error msg is sent back.

#### 3. Create Job (POST)
* Input is taken via req.body , frontend has to provide the following details in the req.body.
* Along with the details frontend has to provide `token` , In the req headers - Authorization : Bearer `token`.
* The token is processed in the backend as following
```js
  // check header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new UnauthenticatedError("Authentication InValid");
    }
    const token = authHeader.split(' ')[1]; // this is where the token is in the authHeader
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);

        // attach the user to the job routes
        req.user = {userId:payload.userId, name :payload.name};
        // other way of doing the above thing
        // const user = User.findById(payload.id).select('-password');
        // req.user = user;
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication Invalid");
    }
```
* URL - localhost:port/api/v1/jobs
```
{
    "company":"Google",
    "position":"Intern"
}
```
* Sample output that the frontend get`s back
```
{
    "job": {
        "company": "Google",
        "position": "Intern",
        "status": "pending",
        "createdBy": "65e736beeab80cda84a6d222",
        "_id": "65e739abeab80cda84a6d226",
        "createdAt": "2024-03-05T15:26:35.856Z",
        "updatedAt": "2024-03-05T15:26:35.856Z",
        "__v": 0
    }
}
```

* If there are any error`s in the input , the corresponding user friendly error msg is sent back.

#### 4. Get All Jobs (GET)
* Only after the authorization is successful , then only the user will get the reponse , else will get  error response.

* URL - localhost:port/api/v1/jobs

* Sample output that the frontend get`s back is a array of objects of type Job
```
{
    "jobs": [
        {
            "_id": "65e739abeab80cda84a6d226",
            "company": "Google",
            "position": "Intern",
            "status": "pending",
            "createdBy": "65e736beeab80cda84a6d222",
            "createdAt": "2024-03-05T15:26:35.856Z",
            "updatedAt": "2024-03-05T15:26:35.856Z",
            "__v": 0
        },
        {
            "_id": "65e73b67a25be8738894442a",
            "company": "Apple",
            "position": "Backend developer",
            "status": "pending",
            "createdBy": "65e736beeab80cda84a6d222",
            "createdAt": "2024-03-05T15:33:59.033Z",
            "updatedAt": "2024-03-05T15:33:59.033Z",
            "__v": 0
        }
    ],
    "count": 2
}
```

* If there are any error`s in the input , the corresponding user friendly error msg is sent back.

#### 5. Get Single Job (GET)
* Only after the authorization is successful , then only the user will get the reponse , else will get  error response and also a id should be provided in the req.params.

* URL - localhost:port/api/v1/jobs/:id
* Example - localhost:port/api/v1/jobs/65e73b67a25be8738894442a

* Sample output that the frontend get`s back is a array of objects of type Job
```
{
    "job": {
        "_id": "65e73b67a25be8738894442a",
        "company": "Apple",
        "position": "Backend developer",
        "status": "pending",
        "createdBy": "65e736beeab80cda84a6d222",
        "createdAt": "2024-03-05T15:33:59.033Z",
        "updatedAt": "2024-03-05T15:33:59.033Z",
        "__v": 0
    }
}
```

* If there are any error`s in the input , the corresponding user friendly error msg is sent back.

#### 6. Update  Job (UPDATE)
* Only after the authorization is successful , then only the user will get the reponse , else will get  error response and also a id should be provided in the req.params.

* URL - localhost:port/api/v1/jobs/:id
* Example - localhost:port/api/v1/jobs/65e739abeab80cda84a6d226

* Sample output that the frontend get`s back is a array of objects of type Job
```
{
    "job": {
        "_id": "65e739abeab80cda84a6d226",
        "company": "google updated",
        "position": "intern updated",
        "status": "pending",
        "createdBy": "65e736beeab80cda84a6d222",
        "createdAt": "2024-03-05T15:26:35.856Z",
        "updatedAt": "2024-03-05T15:45:51.881Z",
        "__v": 0
    }
}
```

* If there are any error`s in the input , the corresponding user friendly error msg is sent back.

#### 7. Delete  Job (DELETE)
* Only after the authorization is successful , then only the user will get the reponse , else will get  error response and also a id should be provided in the req.params.

* URL - localhost:port/api/v1/jobs/:id
* Example - localhost:port/api/v1/jobs/65e739abeab80cda84a6d226
* The document with the provided id will be deleted from the database.
* If there are any error`s in the input , the corresponding user friendly error msg is sent back.





