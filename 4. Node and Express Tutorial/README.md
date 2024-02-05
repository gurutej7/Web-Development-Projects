
### Node JS
* Environment to run JS outside Browser
* Built on Chrome`s V8 JS Engine 
* Big Community
* Full-Stack

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