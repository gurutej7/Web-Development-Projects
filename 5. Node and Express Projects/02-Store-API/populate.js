// instead of adding data one by one , to add all the data at once 

require('dotenv').config();

const connectDB = require('./db/connect');

const Product = require('./models/product');


const jsonProducts = require('./products.json');

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany(); // delete all existing products
        await Product.create(jsonProducts); // in the create method we can pass a single product and also an array can be passed
        console.log("Successfully connected to DB");

        process.exit(0); // to terminate the processs after it is completed we don`t want it to be running
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();