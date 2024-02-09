const express = require('express');
const app = express();
// there is a file called data in which we have bunch of onjects that we will be sending
const { products } = require('./data');
app.get('/', (req, res) => {
 // in real file products is a array
 // but we cannot send js array as a response
 // .json will stringify the data and send the data as a string
  res.json(products)
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
