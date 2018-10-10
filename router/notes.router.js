'use strict';
const express = require('express');

//create router
const router = express.Router();

//simple database
const data = require('../db/notes');
const simDB = require('../db/simDB'); 
const notes = simDB.initialize(data);

router.get('/notes', (req, res, next) => {
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
router.get('/notes/:id', (req, res, next) => {
  const reqId = req.params.id;
  //console.log(req.params.id);
  notes.find(reqId, (err, item) =>{
    if (err){
      return next(err);
    }
    if (item){
      res.json(item);
    } else{
      next();
    }
  });
});

// app.get('/api/notes/:id', (req, res) => {
//   const id = req.params.id;
//   res.json(data.find(item => item.id === Number(id)));
// });

// update
router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  //console.log(req.body);
  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  
  // console.log(updateObj);
  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

module.exports = router;