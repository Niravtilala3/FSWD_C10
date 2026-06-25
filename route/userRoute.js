const express = require('express');
const router = express.Router()

router.get('/',(req, res)=>{
  res.send('user home page');
})

router.get('/info',(req, res)=>{
  res.send('user info page');
})

router.get('/info/:userID',(req, res)=>{
  res.send('user info page'+ req.params.userID);
})

module.exports = router;