const Job = require("../models/Job");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError,NotFoundError} = require("../errors");

//  req.body.createdBy = req.user.userId; this req.user property is set while we are validating the user , check authenticator middleware
// the user property is going to be on every request , since we place the authentication middleware beforw jobs route , in the app.js
const getAllJobs = async (req, res) => {
 const jobs = await Job.find({createdBy : req.user.userId}).sort("createdAt");
 res.status(StatusCodes.OK).json({jobs , count : jobs.length});
};

const getJob = async (req, res) => {
  // res.send("Get single job");
  const jobId = req.params.id;
  const userId = req.user.userId;
  // const {user : {userId} , params : {id}} = req.body;
  const job = await Job.findOne({_id : jobId ,createdBy:userId });

  if(!job){
    throw new NotFoundError(`No job with id ${jobId} `);
  }
  res.status(StatusCodes.OK).json({job});

};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({job});
};

const updateJob = async (req, res) => {
  // res.send("update job");
  const jobId = req.params.id;
  const userId = req.user.userId;
  const {company,position} = req.body; // getting new values from the user

  if(company === '' || position === ''){
    throw new BadRequestError("Company or Position fields cannot be empty");
  }

  const job = await Job.findOneAndUpdate({_id:jobId,createdBy:userId} , req.body , {new:true,runValidators:true});

  if(!job){
    throw new NotFoundError(`No job with id ${jobId} `);
  }
  res.status(StatusCodes.OK).json({job});


};

const deleteJob = async (req, res) => {
  // res.send("delete job");
  const jobId = req.params.id;
  const userId = req.user.userId;

  const job = await Job.findOneAndDelete({_id:jobId,createdBy:userId});

  if(!job){
    throw new NotFoundError(`No job with id ${jobId} `);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
