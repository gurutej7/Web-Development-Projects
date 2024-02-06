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





