'use strict';

const express = require('express');
// add simple in-memory database
const data = require('./db/notes');
const simDB = require('./db/simDB'); 
const notes = simDB.initialize(data);

// Different exported modules
const {PORT} = require('./config');
const logger = require('./middleware/logger');
// INSERT EXPRESS APP CODE HERE...
const app = express();
// log requests
app.use(logger);
// create static web server
app.use(express.static('public'));


app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

// app.get('/api/notes', (req, res) => {
  
//   const searchTerm = req.query.searchTerm;
//   let lowerCaseST = '';

//   if (searchTerm){
//     lowerCaseST = searchTerm.toLowerCase();
//   }
//   //console.log(lowerCaseST);
//   if (lowerCaseST){
//     let searchedList = data.filter(item => {
//       let lowerCaseIT = (item.title).toLowerCase();
//       return lowerCaseIT.includes(lowerCaseST);
//     });
//     res.json(searchedList);
//   } else {
//     res.json(data);
//   }
// });

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  res.json(data.find(item => item.id === Number(id)));
});
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