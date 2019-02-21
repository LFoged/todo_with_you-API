'use strict';

// own modules
const { registerUser, loginUser } = require('./controllers_auth');
const { isLoggedIn } = require('../../middleware/auth_check');
const { validateRegisterLogin } = require('./validate_auth');


// define & export array of route handlers
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
