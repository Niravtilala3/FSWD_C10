const express = require('express');
const app = express();
const userRoute = require('./route/userRoute');
const empRoute = require('./route/empRoute');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/user', userRoute);
app.use('/emp', empRoute);

app.listen(3000,()=>{
  console.log('Server is running on port 3000');
});