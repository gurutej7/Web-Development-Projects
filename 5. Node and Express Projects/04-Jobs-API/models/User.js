const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
    name :{
        type:String,
        required:[true, "Please provide a Name"],
        minlength:3,
        maxlength:50,
    },
    email :{
        type:String,
        required : [true, "Please provide a Email"],
        minlength:9,
        maxlength:50,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide a valid email"],// to check whether it matches the regular expression or not , used to check for the valid email
        unique:true,
    },

    password :{
        type : String,
        required :[true , "Please provide a password"],
        minlength : 8,
    }
})

UserSchema.pre("save" , async function(next){

    const salt = await bcrypt.genSalt(10);
    // here this. is pointing to this document
    const hashedPassword = await bcrypt.hash(this.password,salt);
    this.password = hashedPassword;
    next();
})

UserSchema.methods.createJWT = function (){
    return jwt.sign({userId : this._id,name:this.name} , process.env.JWT_SECRET, {expiresIn :process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);

    return isMatch;

}

module.exports = mongoose.model('User',UserSchema);