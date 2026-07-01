const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');
const empRoute = require('./routes/empRoute');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('req.hostname', req.hostname);
  console.log('req.ip', req.ip);
  console.log('req.path', req.path);
  console.log('req.method', req.method);
  console.log('req.protocol', req.protocol);
  res.render('index', { title: 'C10 expressApp', message: 'Welcome to the C10 expressApp!'});
  // res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Post request received');
});

app.use('/user', userRoute);
app.use('/emp', empRoute);


// Error handling middleware

app.get('/error', (req, res) => {
  throw new Error('BROKEN'); // Express will catch this on its own.
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  //
  res.status(500).send('Something broke!');
});

// 404 
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!');
});

app.listen(3300,()=>{
  console.log('Server is running on port http://localhost:3300');
});