

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
