var express = require('express');
var router = express.Router();
var {register,login,updateProfile,getProfile,acceptProposal,postJob,getJob,getJobs, getJobsByStatus}= require('../service/userService');
var {checkAuthenticationHeader} = require('../util/jwtUtil');
var {getServices, getServiceProviders} = require('../service/businessUserService');
var {generateSignedUrl} = require('../util/s3');
router.post('/register', async function(req, res, next) {
  try{
  console.log(req.body);
  let resp = await register(req.body);
  console.log('resp is',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred",error);
    res.json({error:error.message})
  }
});

router.post('/login', async function(req, res, next) {
  try{
  console.log(req.body);
  let resp = await login(req.body);
  console.log('resp is',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred",error);
    res.json({error:error.message})
  }
});

router.post('/post-job',checkAuthenticationHeader, async function(req, res, next) {
  try{
  console.log(req.body);
  let resp = await postJob({...req.body,user:req._id});
  console.log('resp is',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred",error);
    res.json({error:error.message})
  }
});

router.get('/get-jobs',checkAuthenticationHeader, async function(req, res, next) {
  try{
  console.log(req.query);
  let resp;
  if(req.query.status){
    resp = await getJobsByStatus(req._id,req.query.status);
  }else{
    resp = await getJobs(req._id);
  }
  console.log('resp is',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred",error);
    res.json({error:error.message})
  }
});

router.get('/get-job',checkAuthenticationHeader, async function(req, res, next) {
  try{
  console.log(req.query.jobId);
  let resp = await getJob(req.query.jobId);
  console.log('resp is',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred",error);
    res.json({error:error.message})
  }
});

router.post('/update-proposal',checkAuthenticationHeader, async function(req, res, next) {
  try{
  console.log(req.body);
  let resp = await acceptProposal(req.body);
  console.log('resp is',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred",error);
    res.json({error:error.message})
  }
});


router.post('/update-profile',checkAuthenticationHeader, async function(req, res, next) {
  try{
  console.log(req.body);

  let resp = await updateProfile({...req.body,_id:req._id});
  console.log('resp is',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred",error);
    res.json({error:error.message})
  }
});

router.get('/get-profile',checkAuthenticationHeader, async function(req, res, next) {
  try{
  let resp = await getProfile(req._id);
  console.log('resp is',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred",error);
    res.json({error:error.message})
  }
});

router.get('/get-services',checkAuthenticationHeader, async function(req, res, next) {
  try{
  console.log(req.body);

  let resp = await getServices();
  console.log('resp iss ',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred here",error);
    res.json({error:error.message})
  }
});

router.get('/get-service-providers',checkAuthenticationHeader, async function(req, res, next) {
  try{
  console.log(req.body);

  let resp = await getServiceProviders(req.query.service);
  console.log('resp iss ',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred here",error);
    res.json({error:error.message})
  }
});

router.get('/get-signed-url',checkAuthenticationHeader, async function(req, res, next) {
  try{
  console.log(req.body);

  let resp = await generateSignedUrl();
  console.log('resp iss ',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred here",error);
    res.json({error:error.message})
  }
});
module.exports = router;
