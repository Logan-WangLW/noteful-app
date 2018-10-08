'use strict';

const express = require('express');
// Load array of notes
const data = require('./db/notes');
// INSERT EXPRESS APP CODE HERE...
const app = express();



// ADD STATIC SERVER HERE
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

app.get('/api/notes', (req, res) => {
  res.json(data);
});

// app.get('api/notes/:id', (req, res) => {
//   res.json(data);
// });