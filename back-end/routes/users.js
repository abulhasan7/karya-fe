var express = require('express');
var router = express.Router();
var {register}= require('../service/userService');
/* GET users listing. */
router.post('/register', async function(req, res, next) {
  // res.send('respond with a resource');
  try{
  console.log(req.body);
  let resp = await register(req.body);
  console.log('resp is',resp);
  res.json({message:resp});
  }catch(error){
    console.log("error occurred",error);
    res.json({error:"User already registered"})
  }
});

module.exports = router;
