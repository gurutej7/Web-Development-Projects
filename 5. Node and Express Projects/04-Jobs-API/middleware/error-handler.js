// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong , please try again later",
  };
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  // to get to know about these properties , before setting up this , let the mongoose throw the err ,
  // that is a err object , inside that we can find this code and other properties as well
  
  if (err.code && err.code === 11000) {
    // duplicate email check
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field , please choose enter another value `;
    customError.statusCode = 400;
  }

  if (err.name === "ValidationError") { // Validation error check
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  // cast error check

  // Example response by mongoose fo a cast error :
  /* {
    "err": {
        "stringValue": "\"65e1fc6f0653ee88d4fad89\"",
        "valueType": "string",
        "kind": "ObjectId",
        "value": "65e1fc6f0653ee88d4fad89",
        "path": "_id",
        "reason": {},
        "name": "CastError",
        "message": "Cast to ObjectId failed for value \"65e1fc6f0653ee88d4fad89\" (type string) at path \"_id\" for model \"Job\""
    }
}
  */

  if(err.name === "CastError"){
    customError.msg = `No item with id : ${err.value}`;
    customError.statusCode = 404;
  }
  
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({msg:customError.msg});
};

module.exports = errorHandlerMiddleware;
