## JWT Basics
* JWT - JSON web token
* In the previous project all the routes where public meaning anyone can access them.
* To restrict the access, very popular method is using JWT.
* Assume we have two routes, a login and a dashboard.
* dashboard is protected, we can click as many times to get the dashboard data but cannot access the info.
* only if the user login`s , the user will get a token, once the user has the token then he/she can access the dashboard.
* As long as the token is valid the user can access the dashboard data.
* If a valid token is present in the request, the user can access the specific info.

* JWT 
* ![JWT req and response](/5.%20Node%20and%20Express%20Projects/03-JWT-Basics/public/jwt.png)


* JSON web token is just a way to exchange data between two parties.
* Example for those parties, is a front-end app and a API.

#### Why use JWT ?
* using jwt is better than using a random string because JWT has a security feature where we can be sure about the integrity of our data.
* If the token passes the validation it means that it is the same token that we sent back to the client.
* refer [jwt.io](https://jwt.io/introduction) for more info.
* `jsonwebtoken` is the most used package for handling jwt in our projects, refer [docs](https://www.npmjs.com/package/jsonwebtoken) here.


* Whenever the user wants to access a protected route or resource, the user agent should sent the JWT, typically in the `Authorization` header using the `Bearer` schema.
* The content of the header should look like the following 
* `Authorization : Bearer <token> `
