var express = require('express');
var router = express.Router();
var {login,getProfile,getPendingBusiness, approveBusiness}= require('../service/adminService');
var {checkAdminAuthenticationHeader} = require('../util/jwtUtil');


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


router.get('/get-profile',checkAdminAuthenticationHeader, async function(req, res, next) {
  try{
  let resp = await getProfile(req._id);
  console.log('resp is',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred",error);
    res.json({error:error.message})
  }
});

router.get('/get-pending-business',checkAdminAuthenticationHeader, async function(req, res, next) {
    try{
    let resp = await getPendingBusiness();
    console.log('resp is',resp);
    res.json({message:resp});
    }catch(error){
      console.log("error occurred",error);
      res.json({error:error.message})
    }
  });

  router.post('/approve-pending-business',checkAdminAuthenticationHeader, async function(req, res, next) {
    try{
    let resp = await approveBusiness(req.body._id);
    console.log('resp is',resp);
    res.json({message:resp});
    }catch(error){
      console.log("error occurred",error);
      res.json({error:error.message})
    }
  });

module.exports = router;
