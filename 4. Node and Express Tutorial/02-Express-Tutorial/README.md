

## Node JS
* Environment to run JS outside Browser
* Built on Chrome`s V8 JS Engine 
* Big Community
* Full-Stack
* **[Tutorial Link](https://www.youtube.com/watch?v=Oe421EPjeBE&list=PPSV)** the following content/notes is made while following along this tutorial.



### Difference between Browser and Node.js

| Browser             | Node JS           |
| -------             | -------           |
| DOM                 | No DOM            |
| Window              | No Window         |
| Interactive Apps    | Server Side Apps  |
| No File System      | File System       |
| Fragmentation       | Versions          |
| ES6                 | Common JS         |

Install [NodeJS](https://nodejs.org/en/download)

Enter `node --version` in command window to check

To execute a js file : 
1. Go to command window => `cd` to the file directory
2. Type `node fileName.js`

### GLOBALS (Global variables) - NO WINDOW
* __dirname  - path to current directory
* __filename - file name
* require    - function to use modules ( Common JS )
* module     - info about current module ( file )
* process    - info about environment where the program is being executed

These are only some of the Globals there are many.


### Modules
* CommonJS , every file is module  (by default)
* Modules  - Encapsulated Code  ( only share minimum )
* Every time we want to use a module , the below one is the syntax 
```js
    require('path of the module'); 
    // Names are exported 
    const names = require('./3-names')
```
* To share Minimum data then we have to Specify it in the exports
* Example 

```js

        // Local 
        const secret = "This is not share or exported";
        // Shared via module
        const john = "john";
        const peter = "peter";
        const susan = "Susan";

        // Choosing which to export as a module
        module.exports = {john , peter , susan};
```
* Only things which are specified in the exports can we used when we import mosule via `require`

* Alternate Syntax to Export Modules
```js
    // Alternate Syntax to export 

    module.exports.items = ['item1','item2','item3'];


    const person = {
        name : 'gurutej',
        age : 21 ,
        gender : 'male'
        }

        // using other name
        module.exports.personObject = person;
```

* Without using the exports in the , require file

* When you import a module , the methods/functions being called there are , invoked here by default when we import
* `require('./6-mindGrenade');` in some other file then ,
```js
    // Example to show that , every file is a module , without using " modules.exports" , we can still be able to access it

    let a = 10 ;
    let b = 20 ;

    const addValues = () => {
        console.log(`The sum of a and b is : ${a+b}`);
    }

    addValues();
```
*  The sum of a and b is : 30 is console logged here

That`s it for day 1 🫡
<hr>

### Built-in Modules
* These are the modules that come along with node , we dont have to install them externally.
1. **_OS module :_** This module provides many useful methods and properties for interacting with operating system as well as the server .
    * _Example :_
    ```js
    const os = require('os');

    // info about current user
    const user = os.userInfo();

    // console.log(user);

    // Method return the system uptime in seconds
    console.log(`The system uptime is ${os.uptime()} seconds`);

    const currentOS = {
        name : os.type(),
        release : os.release(),
        totalMemory : os.totalmem(),
        freememory : os.freemem(),
    }

    console.log(currentOS);
    ```
1. **_path module :_** Used to interact with file path`s in the system. it provides many methods and properties.
    
    ```js   
        const path = require('path');
        // returns a path separater in ur system  in my case it is \
        console.log(path.sep);

        const filePath = path.join('content','subfolder','test.txt');
        console.log(filePath);

        console.log(path.basename(filePath));

        const absolute = path.resolve(__dirname,'content','subfolder','test.txt');

        console.log(absolute);
    ```

3. **_fs Module :_** This module is used to interact with file system , like read and write etc.
    * It has two flavours , synchronous (blocking) and asynchronous (non-blocking).
    * _Synchronous :_
    * ```js
      // const fs = require('fs');
        // we can import particular methods by mentioning as below 

        const {readFileSync,writeFileSync} = require('fs');
        // Method takes the file path and the encoding , utf8 is used for text files
        let first = readFileSync('./content/first.txt','utf8');

        let second = readFileSync('./content/second.txt','utf8');

        console.log(first,second);

        // This method takes a path with a file name , if there is no such file  then node will create one ,
        // another parameter is the content we want to write
        // by default it overrides the existing content
        // if we want to append the content to the existing then we have to use a 3rd parameter

        // writeFileSync('./content/result-sync.txt',`Here is the result : ${first} , ${second}`);

        // using third parameter to append
        writeFileSync('./content/result-sync.txt',`Here is the result : ${first} , ${second}`,{flag:'a'});
        ```
    * _Asynchronous :_
    * ```js
            const { readFile, writeFile } = require("fs");

            // for asynchronous methods we need to provide a call back

            readFile("./content/first.txt", "utf8", (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                // console.log(result);
                let first = result;
                readFile("./content/second.txt", "utf8", (error, result) => {
                    if (error) {
                    console.log(error);
                    return;
                    }
                    let second = result;
                    writeFile(
                    './content/result-async.txt',
                    `Here is the result : ${first} ${second}`,
                    { flag: "a" },
                    (error, result) => {
                        if (error) {
                        console.log(error);
                        return;
                        }
                        console.log(result);
                    });
                });
            });
            // If I want to access the result then it will be inside the call back only
            // for doing multiple tasks which are dependent on each other will result in a call back hell
            // for example reading two files and writing a 3rd file by using those 2 files
        ```
    * Difference between _asynchronous_ and _synchronous_ working in javascript. [simple explanation](https://www.geeksforgeeks.org/synchronous-and-asynchronous-in-javascript/)  ,  [in depth explanation](https://www.freecodecamp.org/news/synchronous-vs-asynchronous-in-javascript/) .

4. **_http Module :_** Discussed in detail in the later section of the course.
    * setting up a server using `http` module is as follows.
    * ```js
       const http = require('http');

        const server = http.createServer( (req,res) =>{
            // req is the request object , which is coming from the client to the server
            // it has large information about the request
            // res is also an object , response is what we are sending to the respective request
            if(req.url === '/') res.write("Home Page");
            else if(req.url === '/about') res.write("About page");
            else if(req.url === '/contact') res.write("Contact Page");
            else res.write("Oops , we dont have what u are looking for");
            res.end();
        })


        server.listen(5000); // port
        ```
* There are many built in modules , the above mentioned are very few of them.
<hr>

### [npm (node package manager)](https://www.npmjs.com/)
* npm comes along with node.
* While building our application , there may be functionality which is common , and many developers have already built that functionality.
* In such cases we have two choices either to build that functionality from scratch by ourselves , or use the code that other developer already developed.
* **npm** provides us  the access to the large amount of pre-built code , which we can access through `npm i` `<-Package Name->` in the terminal.
* **_Key Features of npm  :_** 
    1. Re-use our own code in some other project.
    2. Use code written by other developer.
    3. Share our own solutions (code) with other developers as well.
* npm calls the re-usable code a `package`.
* `npm` - global command, comes with node
* `npm --version` , in the terminal to check the version
* _local dependency_ - use it only in this particular project
* `npm i <packageName>`
* global dependency - use it in any project
* `npm install -g <packageName>`
* `package.json` - manifest file (stores the important info about the project/package)
* manual approach (create package.json in the root, create properties etc.)
* `npm init` (step by step, press enter to skip)
* `npm init -y` (everything default)
* When we install a package a folder named **node_modules** is created in which our external package code will be available.
* The size of this folder will be huge , if we are having large number of dependencies(external/imported packages).
* If it`s size is large in our local machine it is ok , but when we want to share our code online on platforms like github , it is not a good way / costlier to share the node modules.
* So we dont share our node modules (it is done using a file `.gitignore` => which is used specify the files that we dont want to share).
* one question that comes is if we dont share the nodemodules, then some other developer who wants use our code , how will he/she know what packages are used.
* for this sake `package.json` comes in handy which has the information of all the packages we used in our project.
* once he/she writes `npm i` in the cmd , npm will scan the package.json and there will be a property called dependencies , then npm will automatically install all the packages that are in the package.json.
* **nodemon** one of the most used dev-dependency while developing a node application. It just keeps on watches for changes in our code and restart`s the application everytime a change is made.
* `npm i nodemon -D`  or `npm i nodemon --save-dev`
* _dev-dependecies_ are dependencies/packages which are used at the time of development but not in the actual production.
* _uninstall a package :_
    1. _Nuclear Approach :_ 
        * Delete node modules , delete package-lock.json , go into the package.json and edit => remove whichever package/dependency that you dont want.
        * Then again `npm i` to get the desired modules only.
    2. `npm uninstall <packageName>` , other way to uninstall a package.
* Everything you want to know about [package.json](https://nodesource.com/blog/the-basics-of-package-json/) is here .
<br>

That`s it for day 2 🫡
<hr>

### Important Topics

#### 1. Event loop: 
* The `event loop` is what allows Node.js to perform non-blocking I/O operations -- despite the fact that javascript is single-threaded -- by `offloading` operations to the system kernel whenever possible.
* resources for more info [docs](https://nodejs.org/en/guides/event-loop-timers-and-nexttick/) 
* video [1](https://www.youtube.com/watch?v=8aGhZQkoFbQ) video [2](https://www.youtube.com/watch?v=PNa9OMajw9w)
* [slides](https://course-api.com/slides.html)

#### 2. Async Patterns
* We always should prefer to write code aynchronously , which can be achieved via different approaches like ,callback hell , Promises and async await.
* check folder =>  01-Node-Tutorial/2-async-patterns , the codes in there are first executed in app.js and then moved there.

#### 3. Events
* `Event-Driven Programming` => Used Heavily in Node.js


    ```js
    // get back the class
    // if want custom extend from class
    // otherwise just for emitting and handling events create instance
    const EventEmitter = require('events')

    const customEmitter = new EventEmitter()

    // on and emit methods   on => Listen for an event  ,  emit => emit an event
    // In on method we pass in the string (name of the event) and a call back (to do some work ) when that particular event is occured
    // keep track of the order
    // additional arguments
    // built-in modules utilize it

    customEmitter.on('response', (name, id) => {
    console.log(`data recieved user ${name} with id:${id}`)
    });

    customEmitter.on('response', () => {
    console.log('some other logic here')
    });

    customEmitter.emit('response', 'guru', 21);
    ```

* First we will listen for the event then we emit it.
* The order of placement of on and event method in the code matters.
* We can pass extra arguments when we are emitting the event. and in the call back fundtion in the on method we can access those parameters.
* refer [docs](https://nodejs.org/docs/latest/api/events.html) for different types of events



#### 4.Streams
* In Node there are 4 different types of streams.
    * _Writable :_ Used to write data sequencially.
    * _Readable :_ Used to read data sequencially.
    * _Duplex :_ Used to both read and write data sequencially.
    * _Transform :_ Used to modify data while reading or writing.
* `Streams` extends `EventEmitter`  class , means we can use events on streams directly.
* for different events [refer](https://nodejs.org/docs/latest/api/fs.html) inside Class : `fs.ReadStream`.
* Reading data in chunks , below example. 

    ```js
    const { createReadStream } = require('fs')

    // default 64kb (chunk size)
    // last buffer - remainder
    // highWaterMark - control size
    // const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
    // const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
    const stream = createReadStream('./content/big.txt')

    stream.on('data', (result) => {
    console.log(result)
    })
    stream.on('error', (err) => console.log(err))
    ```


_Done with Node Fundamentals_


That`s it for day 3 🫡 
<hr>


#### Http Request/Response Cycle
* [slides](https://course-api.com/slides.html)

* _http basics_:
    *  In computer networking, a `port` or port number is a number assigned to uniquely identify a connection endpoint and to direct data to a specific service. At the software level, within an operating system, a port is a logical construct that identifies a specific process or a type of network service. [learn more](https://en.wikipedia.org/wiki/Port_(computer_networking))
    * ports are specific for specific tasks.
    * `res.end()` method must be called after sending the response.
    * [status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)


    ```js
    // console.log('Express Tutorial')
    const http = require("http");

    const server = http.createServer((req, res) => {
    // console.log("user hit the server");
    // method to providing headers
    // arguments are status code , object with key value pairs in which we specify headers (most common type is content-type ) => which type of content we want to send
    // status codes is used to let the browser know what is happening
    // res.writeHead(200,{'content-type' : 'text/html'});
    // res.write('<h1>Hello World</h1>'); // method to write our response
    // res.end();
    // console.log(req.method)
        const url = req.url;
        // home page
        if (url === "/") {
            res.writeHead(200, { "content-type": "text/html" });
            res.write("<h1>home page</h1>");
            res.end();
        }
        // about page
        else if (url === "/about") {
            res.writeHead(200, { "content-type": "text/html" });
            res.write("<h1>about page</h1>");
            res.end();
        }
        // 404
        else {
            res.writeHead(404, { "content-type": "text/html" });
            res.write("<h1>page not found</h1>");
            res.end();
        }
    });

    // port
    server.listen(5000, () => {
    console.log("server listening on port 5000");
    });
    
    ```

* _Example :_ A app , where we created a server using http module.
    * we can read large data(using fs module) and store it in some variable and use it in `res.write()` method.
    ```js
    const http = require('http')
    const { readFileSync } = require('fs')

    // get all files
    const homePage = readFileSync('./navbar-app/index.html')
    const homeStyles = readFileSync('./navbar-app/styles.css')
    const homeImage = readFileSync('./navbar-app/logo.svg')
    const homeLogic = readFileSync('./navbar-app/browser-app.js')

    const server = http.createServer((req, res) => {
        // console.log(req.method)
        const url = req.url
        console.log(url)
        // home page
        if (url === '/') {
            res.writeHead(200, { 'content-type': 'text/html' })
            res.write(homePage) // inside this html file there are other resources that it needs 
            // we need provide path for that resources also
            res.end()
        }
        // about page
        else if (url === '/about') {
            res.writeHead(200, { 'content-type': 'text/html' })
            res.write('<h1>about page</h1>')
            res.end()
        }
        // Inside the homePage , these following url`s will e requested
        // styles 
        else if (url === '/styles.css') {
            res.writeHead(200, { 'content-type': 'text/css' })
            res.write(homeStyles)
            res.end()
        }
        // image/logo
        else if (url === '/logo.svg') {
            res.writeHead(200, { 'content-type': 'image/svg+xml' })
            res.write(homeImage)
            res.end()
        }
        // logic
        else if (url === '/browser-app.js') {
            res.writeHead(200, { 'content-type': 'text/javascript' })
            res.write(homeLogic)
            res.end()
        }
        // 404
        else {
            res.writeHead(404, { 'content-type': 'text/html' })
            res.write('<h1>page not found</h1>')
            res.end()
        }
    })

    server.listen(5000)
    ```

* The above example is used to say that we can set-up our server using `http` module , but when our application has large number of resources , then it would be difficult to manage all those resources as the code in the example.
* So `express` makes things easier.


### Express
* Express is a minimal and flexible nodejs web app framework designed to make developing web apps and api`s much faster and easier.
* Express is not officially part of node unlike http module.
* [documentation](https://expressjs.com/)
* `npm install express` command to import export express module.
* _Express basics Example :_


    ```js
    const express = require('express');

    const app = express(); // creates a server 

    app.get('/' , (req,res) =>{
        console.log('user hit the resource');
        // res.send('Home Page');
        res.status(200).send('Home Page');
    })

    app.get('/about', (req,res) =>{
        res.status(200).send('About page');
    })

    app.all('*',(req,res) =>{
        res.status(404).send('<h1> Resource Not Found </h1>');
    })

    app.listen(5000 , () =>{ // similar to server.listen used in http module
        console.log("server is listening on port 5000");
    })

    // Different methods that we can use on express app
    // app.get -> read data
    // app.post -> insert data
    // app.put -> update data
    // app.delete -> delete data
    // app.all
    // app.use
    // app.listen
    ```

That`s it for day 4 🫡 
<hr>

#### static assets and public folder
* The details about the topic is covered in the code comments
    ```js
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
        // index.html is always going to be the root , when user hits the server the server by default serves the index.html
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
    ```


### API vs SSR

* `API` -> Application Programming Interface
* `SSR` -> Server side rendering

| API                 | SSR               |
| -------             | -------           |
| API-JSON            | SSR -Template     |
| Send Data           | Send Template     |
| `res.json`          | `res.render`      |

* API can mean differently in various scenarios
* In express or in http case , when we talk about API , we mean setting up an http interface to interact with our data.
* data is sent using json(Javascript object notation) ,inorder to send back our response we will use `res.json` which will do all the heavy lifting , for example setting up the proper content type and stringify our data.
* The main idea with API`s is that our server provides data that means any frontend app that wants to access it and use it can simply perform a http request and using our data set up the api and functionality.


* The other flavour we have is SSR where we will setup templates and will send back entire html , css and js.


#### json basics

```js
        const express = require('express');
        const app = express();
        // there is a file called data in which we have bunch of onjects that we will be sending
        const { products } = require('./data');
        app.get('/', (req, res) => {
        //  file products is a array
        // .json will stringify the data and send the data as a string
        res.json(products)
        })

        app.listen(5000, () => {
        console.log('Server is listening on port 5000....')
        })
```
* [docs json](https://expressjs.com/en/4x/api.html)

#### `res.json([body])`
* Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().
* The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it to convert other values to JSON.

    ```js
        res.json(null)
        res.json({ user: 'tobi' })
        res.status(500).json({ error: 'message' })
    ```

#### Route Params
* in the url `/:placeHolder`
* the request object has a proprty `req.params` , by using the we can access a particular value of the route parameter passed in the url.
* there can be multiple route parameters in a single url(uniform resource locator)

#### Query String parameters
* also called url parameters
* it is a way for us to send small amount of information to the server using the url. 
* This information is usually used as parameters to query database , filter results etc..
* in order to access query string parameters use `req.query` .
* `url/query?name=guru&age=21` example of query string parameter how it is used in the url
* _The below code example covers the different aspects of **route params** and **query string parameters**_


    ```js
        const express = require("express");
        const app = express();
        // there is a file called data in which we have bunch of onjects that we will be sending
        const { products } = require("./data.js");
        app.get("/", (req, res) => {
        //  file products is a array
        // .json will stringify the data and send the data as a string
        res.send("<h1> Home Page </h1> <a href='/api/products'>Products<a>");
        });

        app.get("/api/products", (req, res) => {
        // in general we won`t be sending the entire data
        // we are going to send the product without description
        // I am going to create a new array without description
        const newProducts = products.map((product) => {
            // javascript method
            // being selective of what we are sending back
            const { id, name, image } = product;
            return { id, name, image };
        });
        res.json(newProducts);
        });

        // we are going to give entire data when the user requests a particular product ,
        app.get("/api/products/:productID", (req, res) => {
        // console.log(req);
        // console.log(req.params);
        let { productID } = req.params; // getting the requested product id from the params
        // searching for that product in the product array using the id
        const singleProduct = products.find(
            (product) => product.id === parseInt(productID)
        );
        // if it is a invalid id
        if (!singleProduct) return res.status(404).send("product does not exist");
        // sending that single product which is requested
        res.json(singleProduct);
        });

        // Example to using multiple route params
        app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
        // console.log(req.params);
        res.send("Hello example for using multiple route params");
        });

        // query string examples
        app.get("/api/v1/query", (req, res) => {
        // console.log(req.query);
        const { search, limit } = req.query;
        let sortedProducts = [...products];
        // res.send("Hello this is a query string example");
        // http://localhost:5000/api/v1/query?name=guru&id=4
        // req.query output : { name: 'guru', id: '4' }
        // we can add as many as query string parameters & is used to add multiple
        // http://localhost:5000/api/v1/query?search=a&limit=2

        if (search) {
            // if search exists in our product then we are going to filter
            sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
            });
        }
        if (limit) {
            sortedProducts = sortedProducts.slice(0, Number(limit));
        }
        if (sortedProducts.length < 1) {
            // res.status(200).send('no products matched your search');
            // common practice is as follows
            return res.status(200).json({ success: true, data: [] });
        }
        // else // if we don`t add else here after the if statement javascript will read next line and sends that also
        // for that the express(our server) will give error , i have already sent the response then why are you sending again
        return res.status(200).json(sortedProducts);
        // http://localhost:5000/api/v1/query?search=albany&limit=1
        // we don`t need to pass all (both limit and name)
        // we can pass only one
        // if we don`t pass anything in our case we are sending back the entire products array
        // http://localhost:5000/api/v1/query?search=a

        // for one request we can send only one response
        // instead of if else mess , we can use return at the res.send method
        });

        app.listen(5000, () => {
        console.log("Server is listening on port 5000....");
        });
    ```

That`s it for day 5 🫡 
<hr>


### Middleware 
* Express Middlewares are functions that execute during the request to the server , each middleware function has access to request and response objects.
* Middleware sits in between req and res , that name itself says. `req -> middleware -> res`.
* An Example of a Basic Middleware Functionality is as follows ,


    ```js
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
    ```

* In the above example the logger is the middleware , which is accessing our req , before we are sending back the response.
* But in the above example for every route we are passing the middleware , instead we can use `app.use(middleware)` to link it to the all methods , we are handling.
* we can keep the middleware in the separate file also , so that we keep our app.js clean. we can access that middleware by assigning it to a variable using `require("path")`
* Example : `const logger = require('./logger');`
* **Multiple Middleware Functions** : It is similar to passing single middleware function where we now will pass a `array` of middleware functions.
* The order of placing in the array matters , the functions are executed from left to right.
* Example of passing multiple middleware functions and using app.use is as follows .

    ```js
        const express = require('express')
        const app = express();
        const logger = require('./logger');
        const authorize = require('./authorize');

        //  req => middleware => res

        // app.use(logger); // adding a middleware to all routes
        // app.use will invoke that function passed inside for any route
        // The order of code where we are placing the app.use matters.
        // we can provide a other argument which is the path => app.use('/api',logger);
        // the logger will be applied to all routes with api , in our case api/products and api/items
        // if we did not pass the path then it is going to applied for all our paths.

        app.use([logger,authorize]); // They are executed in the order from left to right , in this case logger is executed first then autorizer ,
        // if we  change the order then it is vice versa.

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

    ```

* _use vs route :_ Which one to use , there can be some middlewares which we don`t want to use for all routes . in such cases we will specify them in the method i.e, between route and the (req,res) as a parameter.
* our options when it comes to middleware , 
    * Creating our own middlewares as in the above examples.
    * Express provides some built in middleware functions. (Ex : `app.use(express.static('./public'))` )
    * Using third party middleware , for that we have to install it. Ex : morgan npm => `npm i morgan`

### Http Methods :
1. `GET` : Retrieves information from the specified resource, and should only be used to request data (not to modify it).
2. `POST` : Sends data to the server for processing, usually resulting in a change in the server state or side effects on the server.
3. `PUT` : Updates a current resource or creates it if it doest`nt exist, with the client providing a complete and updated copy of the resource.
4. `PATCH` : Updates parts of an existing resource, with the client providing only the parts of the resource that needs to be updated.
5. `DELETE` : Removes the specified resource from the server.
6. [more info](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) 

That`s it for day 6 🫡 
<hr>

* **GET :** get was default method performed by browser.


* **POST :** we cannot use browser perform a  post request , either we need to use a external tool (postman) or to setup a working application.
    * _1st Flavour :_ (Using a html form)
    *  ```html
        <form action="/login" method="POST">
            <h3>Traditional Form</h3>
            <div class="form-row">
            <label for="name"> enter name </label>
            <input type="text" name="name" id="name" autocomplete="false" />
            </div>
            <button type="submit" class="block">submit</button>
        </form>
        ```
    * if we want to add something on to the server  , ofcourse we need to access that data , so body of the post request is crucial.
    * Whereas incase of get request we are not sending body.
    * ` <input type="text" name="name" id="name" autocomplete="false" />`
    * whatever we provide in the above line for the name attribute is going to be our key and the value is whatever we are submitting.
    *  ```js
        // middleware to get/parse the form data
        app.use(express.urlencoded({extended : false})); // to know more refer docs

        app.post('/login' , (req,res) =>{
        // console.log(req.body);// for input "guru" in form => output : [Object: null prototype] { name: 'guru' }
        const {name} = req.body;
        if(name){
            return res.status(200).send(`Welcome ${name}`);
        }
        res.status(401).send("Please provide credentials");
        })
        ```
    * _Second Flavour :_ (Using javascipt to send post request)
    *   ```html
            <form>
                <h3>Javascript Form</h3>
                <div class="form-row">
                    <label for="name"> enter name </label>
                    <input
                    type="text"
                    name="name"
                    id="name"
                    class="form-input"
                    autocomplete="false"
                    />
                    <small class="form-alert"></small>
                </div>
                <button type="submit" class="block submit-btn">submit</button>
            </form>
        ```
    * Here in the form we don`t have the action and method mentioned. To know more about the funtionality check 02/Express-Tutorial/methods-public/javascript.html
    *   ```js
            // middleware to parse json data 
            app.use(express.json());

            app.post('/api/people' , (req,res) =>{
            const {name} = req.body;
            if(name){
                return res.status(201).send({success:true , person : name});
            }

            // if no name -> invalid input
            res.status(400).json({success : false , msg:'please provide name value'});
            
        })
        ```
    * for front end logic who are sending the post request , once after our response , how they are handling the response  , check 02/Express-Tutorial/methods-public/javascript.html.


* In the above 2 flavors the major problem is to test our backend functionality i.e., for every route  we need entire frontend setup which is a lot of work.

* Install [postman](https://www.postman.com/downloads/) to perform requests without the frontend to test our API`s .

* **PUT :** This method is for editing/updating the data.


    ```js
    // using route params to specify the data we are looking for
    app.put('/api/people/:id' , (req,res) =>{
        // we are getting the specified data that we want to change  in the url
        const {id} = req.params;
        // and in the body we get the new value that we want have in place of existing data
        // the value we will get from the user
        const {name} = req.body;
        
        // console.log(id,name);
        // res.send("Testing");
        // checking if id exist or not
        const person = people.find( (person) => person.id === Number(id));
        if(person){
            // iterating over the array to find the person with the given id
            const newPerson = people.map((person) =>{
                if(person.id === Number(id)){// once we have found then update 
                    person.name = name;
                }

                return person;
            })

            return res.status(200).json({success : true , data : newPerson});
        }
        // if the person doesn`t exist with the provided id
        res.status(404).json({success : false , msg:`no person with the id ${id}`});

    })
    ```

* **DELETE :** Delete and put are similar , in put we find the data and update , here we find that data and we delete it.

    ```js
    app.delete("/api/people/:id", (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id));
    // if that person doesnot exist
    if (!person) {
        return res
        .status(404)
        .json({ success: false, msg: `no person with id ${req.params.id}` });
    }
    // using filter method to remove that sucker and creating a new one
    // It is just a example to have a array , in normal we will perform the following operation in the database
    const newPeople = people.filter(
        (person) => person.id !== Number(req.params.id)
    );
    return res.status(200).json({ success: true, data: newPeople });
    });
    ```

#### Router in Express
* The movement we are trying to have more routes and more functionality , our app.js is getting queit busy.
* The solution is using `express router` where we can group those routes together and as for as the functionality , we can actually set them as separate controllers.
* common covention is to use a folder named `routes` and inside which we will have all the routes.
* inside that folder we can create separate files for some routes .
* inside those files we are going to use a middleware provided by express . 
* `const router = express.Router();`
* then copy paste the methods methods from app.js and paste it in the file then replace `app` with `router` refer `routes` folder for more info.
* In general have similar routes in a same file(JS file) .
*   ```js
    // the base path is mentioned here , for routes in that folder the mentioned path is like home page 
    app.use('/api/people',peopleROuter);
    app.use('/login',loginRouter);
    ```
* after setting up the routes in the separate folder we can use them as shown.
* If I am here again I will highly recommend me to check the routes folder for better understanding.




That`s it for day 7 🫡 
<hr>


#### Router Controllers
* Although after Keeping routes in the separate folder and files , in the process of cleaning app.js they themselves became messy.
* We are going to separate the functionality into a another folder called controllers.
* once checkout controllers folder.


Done with Express Fundamentals , on to the projects next.

That`s it for day 8 🫡 
<hr>
