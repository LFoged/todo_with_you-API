'use strict';

// own modules
const { registerUser, loginUser } = require('./controllers_auth');
const { isLoggedIn } = require('../../middleware/auth_check');
const { validateRegisterLogin } = require('./validate_auth');


// receive router & define routes, using router's methods
module.exports = (router) => {
  // POST - '/api/auth/register' => register new user
  router.post('/register', [isLoggedIn, validateRegisterLogin, registerUser]);

  // POST - '/api/auth/login' => log user in
  router.post('/login', [isLoggedIn, validateRegisterLogin, loginUser]);


  // return router to register defined routes
  return router;
};
