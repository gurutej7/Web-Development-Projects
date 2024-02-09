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
