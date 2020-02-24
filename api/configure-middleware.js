const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// function logger(req, res, next) {
//   console.log(req.method, req.url, Date.now());
//   next();
// }

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  // server.use(logger);
};
