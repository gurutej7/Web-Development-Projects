const num = 200;

if(num % 2 === 0) console.log("even number");
else console.log("odd Number");

// GLOBALS - NO WINDOW !!!

// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules ( Common JS )
// module     - info about current module ( file )
// process    - info about environment where the program is being executed
console.log(__dirname);
console.log(__filename);
console.log(process);