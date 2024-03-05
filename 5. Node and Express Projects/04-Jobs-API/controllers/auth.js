const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError,UnauthenticatedError} = require("../errors");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  // checking or validating manually
  // const {name,email,password} = req.body;
  // if(!name || !email || !password){// if any of the value is not provided
  //   throw new BadRequestError("Please provide name,email and password");
  // }
  // we don`t need above lines because we are using mongoose validators

  /* const {name,email,password} = req.body;

  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password,salt);

  // const tempUser = {name,email,password:hashedPassword};

  // const user = await User.create({...tempUser});// ... is used to spread the key :value pairs
  */ // this block of code is removed , because we can use mongoose middleware , in the schema
  const user = await User.create({...req.body});
  // const token = jwt.sign({userId : user._id, name : user.name},"jwtSecret",{expiresIn : "30d"});
  // using Schema instance methods to avoif the above code here
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({user :{name :user.name},token});
};

const login = async (req, res) => {
  const {email,password} = req.body;

  if(!email || !password){
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({email});
  
  if(!user){
    throw new UnauthenticatedError("Invalid credentials");
  }

  // compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if(!isPasswordCorrect){
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({user :{name:user.name},token});

};

module.exports = { register, login };
