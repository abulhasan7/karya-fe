var express = require('express');
var router = express.Router();
var {register,login,updateProfile,getJobs,getProfile,addService,getServices, postProposal}= require('../service/businessUserService');
var {checkBusinessAuthenticationHeader,checkBusinessAuthenticationHeaderForVerified} = require('../util/jwtUtil');

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

router.post('/add-service',checkBusinessAuthenticationHeaderForVerified, async function(req, res, next) {
  try{
  console.log(req.body);

  let resp = await addService({...req.body,_id:req._id});
  console.log('resp iss ',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred here",error);
    res.json({error:error.message})
  }
});

router.post('/post-proposal',checkBusinessAuthenticationHeaderForVerified, async function(req, res, next) {
  try{
  console.log(req.body);

  let resp = await postProposal({...req.body,_id:req._id});
  console.log('resp iss ',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred here",error);
    res.json({error:error.message})
  }
});

router.get('/get-jobs', checkBusinessAuthenticationHeaderForVerified,async function(req, res, next) {
  try{
  console.log(req.body);
  let resp = await getJobs(req._id);
  console.log('resp is',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred",error);
    res.json({error:error.message})
  }
});


router.get('/get-services',checkBusinessAuthenticationHeaderForVerified, async function(req, res, next) {
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

router.post('/update-profile',checkBusinessAuthenticationHeaderForVerified, async function(req, res, next) {
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

router.get('/get-profile',checkBusinessAuthenticationHeader, async function(req, res, next) {
  try{
  let resp = await getProfile(req._id);
  console.log('resp is',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred",error);
    res.json({error:error.message})
  }
});

module.exports = router;
