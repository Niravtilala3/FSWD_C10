const express = require('express');
const app = express();

const mongoose = require('mongoose');

const mongoUri = 'mongodb://127.0.0.1:27017/FSWD_C10';

const userRoute = require('./routes/userRoute');
const empRoute = require('./routes/empRoute');
const studentRoute = require('./routes/studentRoute');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use('/student', studentRoute);


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

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    app.listen(`3300`,()=>{
      console.log('Server is running on port http://localhost:3300');
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();