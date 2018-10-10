'use strict';

const express = require('express');
const morgan = require('morgan');
const router = require('./router/notes.router');

// Different exported modules
const {PORT} = require('./config');
//const logger = require('./middleware/logger');

// INSERT EXPRESS APP CODE HERE...
const app = express();
// log requests using morgan
app.use(morgan('dev'));
// app.use(logger);
// create static web server
app.use(express.static('public'));
// Parse request body
app.use(express.json());
// mount router to api
app.use('/api', router);

// error example
app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// ADD STATIC SERVER HERE
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});