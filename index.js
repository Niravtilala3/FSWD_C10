const express = require('express');
const app = express();
const userRoute = require('./route/userRoute');
const empRoute = require('./route/empRoute');

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index');
  // res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Post request received');
});

app.use('/user', userRoute);
app.use('/emp', empRoute);

app.listen(3000,()=>{
  console.log('Server is running on port 3000');
});