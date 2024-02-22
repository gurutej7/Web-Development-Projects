const Product = require("../models/product");

// this one is used for testing , with hardcored values before we implement it dynamically in our original route
const getAllProductsStatic = async (req, res) => {
  const search = "aaa"; // regex query operator
  // to search for the words those have this pattern
  // Ex : Product.find({name : {$regex : search , $options :'i'}})
  //above line working ->  we are looking for the name property but instead of looking for entire name ,
  // we are just looking for the names , with the provided pattern , refer docs for more info
  // sorting
  // const products = await Product.find({}).sort({name : -1 , price : -1});
  const products = await Product.find({ price: { $lt: 30 } })
    .sort("price")
    .select("name price")
    .limit(10);
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // user may enter some properties which our product(model) does not have ,
  // so only pull out the properties that we have for our product(model) from the query string
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) queryObject.featured = featured === "true" ? true : false;

  if (company) queryObject.company = company;

  if (name) queryObject.name = { $regex: name, $options: "i" };

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regex = /\b(<|>|>=|=|<=)\b/g; // regular expression matching ,refer about it on the internet
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    ); // if there is a match then replace it with the corresponding value from the operatorMap
    // console.log(numericFilters); // price<50,rating>=4
    // console.log(filters); // price-$lt-50,rating-$gte-4
    // successfully converted the user friendly values to the values that are understood by the mongoose

    // come up with options on which we can apply the numeric filter
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
        // input : price<50,rating>=4
        // output of query object in console : { price: { '$lt': 50 }, rating: { '$gte': 4 } }
      }
    });
  }

  //  console.log(queryObject);
  // const products = await Product.find({}).sort('name' '-price');
  // we removed the await below because , we don`t know if sort exists or not so we don`t want to complete the find
  // since we have removed the await , it will be off-loaded
  // we move forward and check if sort exist then we will chain it on to the .find()
  let result = Product.find(queryObject);

  if (sort) {
    // input => // {{STORE}}/products?sort=name,-price
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    // default , if sort is not specified , sort based on the time of product is created
    result = result.sort("createdAt");
  }

  // checking if user has specified any selective data or not
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  const limit = Number(req.query.limit) || 10; // if not limit is passed use by default value of 10
  const page = Number(req.query.page) || 1; // if page is not specified use by default as one
  const skip = (page - 1) * limit;

  result = result.limit(limit).skip(skip);
  // For example we have 23 products
  // num. of pages if i decide to limit my response to 7 products  => 23/7 = 4  => 7 7 7 2
  // if i am looking for page 2 , then i have to skip 1st 7
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
