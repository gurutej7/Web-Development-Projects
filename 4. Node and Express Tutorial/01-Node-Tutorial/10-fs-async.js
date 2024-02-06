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
      "./content/result-async.txt",
      `Here is the result : ${first} ${second}`,
      { flag: "a" },
      (error, result) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(result);
      }
    );
  });
});
// If I want to access the result then it will be inside the call back only
// for doing multiple tasks which are dependent on each other will result in a call back hell
// for example reading two files and writing a 3rd file by using those 2 files
