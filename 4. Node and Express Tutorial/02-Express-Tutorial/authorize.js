const authorize = (req,res,next) =>{
    // console.log("authorize");
    const {user} = req.query;
    if(user === 'guru'){
        req.user = {name:'guru' ,age:21};
        console.log(req.user);
        // in any of our routes where we have attached this middleware , there we can accesss the req.user
        next();
    }
    else{
        res.status(401).send("Unauthorixed");
    }
    next();
}

module.exports = authorize;