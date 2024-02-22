## **Store - API**
* Built a Store where users can fetch  products.
* users can fetch different products , the response changes dynamically with respect to the filter applied by the user.
* _MongoDB Atlas_ cloud is used for database.
* Functionality of the api is tested using postman.

### Key features
* Implemented Diffrent filters , which users can apply and get response based on the filter they have applied.
* Implemented the functionality in such a way that the response will dynamically change based on the filter applied by the user.
* Gathered the filters applied by the user via query string params (req.query).



### **Mongoose filter Methods :**
* [Mongoose](https://mongoosejs.com/docs/queries.html)

```js

        // With a JSON doc
            await Person.
            find({
                occupation: /host/,
                'name.last': 'Ghost',
                age: { $gt: 17, $lt: 66 },
                likes: { $in: ['vaporizing', 'talking'] }
            }).
            limit(10).
            sort({ occupation: -1 }).
            select({ name: 1, occupation: 1 })
```


1. **Mongoose sort filter**
    * used to sort the documents , based on the property mentioned in the method.
    * syntax : `model.find({}).sort({property : 1})` -> sorts in ascending order.
    * use `-1` as value for descending order.
    * Alternate Syntax - `model.find({}).sort("property1 property2")` give property as a string , for multiple properties separate by a space` `.
    * use `-propertyname` for descending order.

2. **Mongoose Select filter**
    * used to get the item with only the specified properties.
    * `model.find({}).select("property1 property2")`;
    * we need to come up with a name in query string.
    * Ex: api/v1/products?fields=name,price
    * If fields exist in the request then we chain the select to the find method with the given parameters from the URL.
    * To convert user friendly input in the URL to how the mongoose will understand , we have use JS and apply some logic , refer controllers folder.

3. **Mongoose skip and limit filter**
    * `limit` -> how many items the user want to get back.
    * `model.find({}).limit(num)` num = 1,2,3...
    * We only get the items/documents with the specified limit of the number.
    * If the num is bigger than all the items we have then user will get all the items we have.
    * `skip` works exactly the same way, the difference is it skips first number of items in the response.
    * `model.find({}).limit(num).skip(num2)`

4. **Mongoose Numeric filter**
    * To provide option for user to search based on the number condition.
    * For Example: get the products where the price is less than 50.
    * Ex: api/v1/products?numericfilters=price>30
    * Ex: api/v1/products?numericfilters=price>30,rating>=4.5&sort=price
    * Ex: `model.find({price : {$gt : 30},rating : {$gte :4}});`
    * But to covert user friendly input price>30,rating>=4 to the language mongoose understands {price : {$gt : 30},rating : {$gte :4}} , need to study about `regex`, regular expression matching
    * To see the implementation refer => controllers folder => products.js => getAllProduts => numericFilters.

* The input (filter) is sent by the user via query string params
* image taken while testing in postman

![testing image](/5.%20Node%20and%20Express%20Projects/02-Store-API/public/img.png)
