'use strict';

// own modules
const { registerUser, loginUser } = require('./controllers_auth');
const { isLoggedIn } = require('../../middleware/auth_check');
const { validateRegisterLogin } = require('../validation_common');


// define & export route endpoints, methods & handlers (middleware)
module.exports = [
  {
    // POST - '/api/auth/register' => register new user
    method: 'POST',
    path: '/register',
    handlers: [isLoggedIn, validateRegisterLogin, registerUser]
  },
  {
    // POST - '/api/auth/login' => log user in
    method: 'POST',
    path: '/login',
    handlers: [isLoggedIn, validateRegisterLogin, loginUser]
  }
];
