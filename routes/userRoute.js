const express = require('express');
const router = express.Router();

const user = [
  {id: 1, name: 'John Doe',city: 'New York'},
  {id: 2, name: 'Jane Smith',city: 'Los Angeles'},  
  {id: 3, name: 'Bob Johnson',city: 'Chicago'},
  {id: 4, name: 'Alice Williams',city: 'Houston'},
]

router.get('/',(req, res)=>{
  res.json(user);
})

router.get('/:userID',(req, res)=>{
  const userID = parseInt(req.params.userID);
  const selectedUser = user.find(u => u.id === userID);
  if (selectedUser) {
    res.json(selectedUser);
  } else {
    res.status(404).send('User not found');
  }
});

router.post('/',(req, res)=>{
  const newUser = {} 
  newUser.id = user.length + 1;
  newUser.name = req.body.name;
  newUser.city = req.body.city;
  user.push(newUser);
  res.status(201).json(newUser);
});

router.put('/:userID',(req, res)=>{
  const userID = parseInt(req.params.userID);
  const selectedUser = user.find(u => u.id === userID);
  if (selectedUser) {
    selectedUser.name = req.body.name || selectedUser.name;
    selectedUser.city = req.body.city || selectedUser.city;
    res.json(selectedUser);
  } else {
    res.status(404).send('User not found');
  }
});

router.delete('/:userID',(req, res)=>{
  const userID = parseInt(req.params.userID);
  const index = user.findIndex(u => u.id === userID);
  if (index !== -1) {
    const deletedUser = user.splice(index, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).send('User not found');
  }
});

router.get('/info',(req, res)=>{
  res.send('user info page');
})

router.get('/info/:userID',(req, res)=>{
  res.send('user info page'+ req.params.userID);
})

module.exports = router;