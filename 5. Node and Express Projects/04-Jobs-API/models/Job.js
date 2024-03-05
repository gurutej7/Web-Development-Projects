const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    company :{
        type : String,
        required : [true,"Please provide company name"],
        maxlength:50
    },
    position:{
        type : String,
        required : [true,"Please provide the position"],
        maxlength:100
    },
    status:{
        type : String,
        enum :["interview" , "declined" , "pending"],// to have some fixed options for the value
        default :"pending",
    },
    createdBy:{ // tieng our job model to the user one
        type : mongoose.Types.ObjectId,
        ref :'User',
        required : [true,"Please provide the user"]
    }
},{timestamps:true}); // to allow mongoose to add createdAt and UpdatedAt properties to our document 
// Example : 
/*
    "job": {
            "company": "google",
            "position": "intern",
            "status": "pending",
            "createdBy": "65e0976530c3bdf5a02512cf",
            "_id": "65e1f59753a36e66ea148627",
            "createdAt": "2024-03-01T15:34:47.019Z",
            "updatedAt": "2024-03-01T15:34:47.019Z",
            "__v": 0
        }
*/

module.exports = mongoose.model("Job",JobSchema);