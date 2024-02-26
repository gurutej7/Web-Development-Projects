require("dotenv");
const jwt = require("jsonwebtoken");
// const CustomAPIError = require("../errors/custom-error");
const {UnathenticatedError} = require("../errors")

const authenticationMiddleware = async (req,res,next) =>{
    // console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnathenticatedError("No token Provided");
    }
    // javascript magic
    const token = authHeader.split(' ')[1]; // we got the token from the frontend
    // console.log(token);

    // we have to verify if the token is valid or not
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const {id,username} = decoded;
        req.user = {id,username};
        next();
        // console.log(decoded); => output : { id: 24, username: 'guru', iat: 1708789949, exp: 1711381949 }
        
    } catch (error) {
        throw new UnathenticatedError('Not authorized to access this route');
    }
   
}

module.exports = authenticationMiddleware;