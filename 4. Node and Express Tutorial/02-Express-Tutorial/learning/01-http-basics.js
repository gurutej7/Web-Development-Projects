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
