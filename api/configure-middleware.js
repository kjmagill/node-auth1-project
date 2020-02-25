const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexStore = require('connect-session-knex')(session); // remember to curry and pass the session
const knex = require('../data/dbConfig'); // needed for storing sessions in the database

const sessionConfig = {
  name: 'monkey',
  secret: 'the secret password', // different than Production secret in .env
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false, // In production, set to 'true' [true = https only]
    httpOnly: true // true = JavaScript cannot access the cookie
  },
  resave: false, // false = if a cookie hasn't changed, don't recreate it
  saveUninitialized: true, // GDPR compliance. In production, ask client if they agree to set cookie
  store: new knexStore({
    knex,
    tablename: 'sessions',
    createtable: true,
    sidfieldname: 'sid',
    clearInterval: 1000 * 60 * 15 // msecs * secs * minutes (it is set to 15 minutes here)
  })
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig)); // creates a req.session object
};
