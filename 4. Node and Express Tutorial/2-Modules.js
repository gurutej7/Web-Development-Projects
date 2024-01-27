// CommonJS , every file is module  (by default)
// Modules  - Encapsulated Code  ( only share minimum )

// const john = "john";
// const peter = "peter";
// const susan = "Susan";

// const sayHi = (name) =>{
//     console.log(`Hi there ${name}`);
// }


// To understand working of modules in node refer  3-names.js and 4-util.js

// Every time we want to use a module , the below one is the syntax "  require(' path of the module');  "
// Names are exported 
const names = require('./3-names');

// Say Hi function is exported
const sayHiFunction = require('./4-util');


console.log(names);

sayHiFunction(names.john);
sayHiFunction(names.peter);
sayHiFunction(names.susan);

// All the exports are exported 
const alternateWays = require('./5-alternateSyntax');

console.log(alternateWays.items);
console.log(alternateWays.personObject);


// Without using the exports in the , require file

// When you import a module , the methods/functions being called there are , invoked here by default when we import
require('./6-mindGrenade'); // The sum of a and b is : 30 is console logged here

// Importibg a in-built module
const os = require('os');

// info about the user

const user = os.userInfo();

console.log(user);

// Method returns the system uptime in seconds

console.log(`The System uptime is ${os.uptime()} seconds`);

// Taking multiple methods from the inbuilt module and using it

const currentOs = {
    currentOsName : os.type(),
    osReleaseVersion : os.release(),
    totalMemory : os.totalmem(),
    freeMemory : os.freemem() 
}

console.log(currentOs);