'use strict';

const logger = function (req, res, next){
  const date = new Date();
  const dateString = date.toString();
  console.log(`${dateString} ${req.method}${req.url}`);
  next();
};

module.exports = logger;