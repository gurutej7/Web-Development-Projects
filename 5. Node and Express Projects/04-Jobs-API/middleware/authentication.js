const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {UnauthenticatedError} = require("../errors");

const auth = async (req,res,next) =>{
    // check header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new UnauthenticatedError("Authentication InValid");
    }
    const token = authHeader.split(' ')[1]; // this is where the token is in the authHeader
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);

        // attach the user to the job routes
        req.user = {userId:payload.userId, name :payload.name};
        // other way of doing the above thing
        // const user = User.findById(payload.id).select('-password');
        // req.user = user;
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication Invalid");
    }
}

module.exports = auth;