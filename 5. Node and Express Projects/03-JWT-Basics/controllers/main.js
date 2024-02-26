// Main Goal
// check for username , password in post(login) request, available in the req.body
// if exist create new JWT
// send back to front-end
// else send a error message , "please provide username and password"



// set-up authentication so only the request with JWT can access the dashboard
// only the GET requests with the JWT can access the dashboard

const jwt = require("jsonwebtoken");
// const CustomAPIError = require("../errors/custom-error");
const {BadRequestError} = require("../errors");


const login = async (req , res)=>{
    const {username,password} = req.body;
    // console.log(username,password);
    // ways to check the username and password , we have the following options
    // mongoose validations
    // package by the name of Joi
    // check in the controller

    if(!username || !password){
        throw new BadRequestError('Please provide username and password');
    }
    // just for demo , generally it is provided by the Database
    const id = new Date().getDate();

    // payload = Try to keep payload small, better experience for user
    // jwt.sign(payload,secret,options)
    // secret = in production use long, complex and unguessable string value***
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:"30d"});
    // res.send("Fake login/register/signUp");

    res.status(200).json({msg:`user created `,token});
}

const dashboard = async(req,res) =>{
    // console.log(req.headers);
    const luckyNumber = Math.floor(Math.random()*100);

    // console.log(req.user);  output : { id: 24, username: 'guru tej' }
    res.status(200).json({msg : `Hello , ${req.user.username}`,secret :`Here is your Authorized data , your lucky number is  ${luckyNumber}`});

}

module.exports = {
    login,
    dashboard
}