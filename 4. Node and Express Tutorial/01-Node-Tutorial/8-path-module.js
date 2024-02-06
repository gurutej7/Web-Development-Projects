
const path = require('path');
// returns a path separater in ur system  in my case it is \
console.log(path.sep);

const filePath = path.join('content','subfolder','test.txt');
console.log(filePath);

console.log(path.basename(filePath));

const absolute = path.resolve(__dirname,'content','subfolder','test.txt');

console.log(absolute);