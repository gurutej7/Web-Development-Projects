// Local 
const secret = "This is not share or exported";
// Shared via module
const john = "john";
const peter = "peter";
const susan = "Susan";

// Choosing which to export as a module
module.exports = {john , peter , susan};