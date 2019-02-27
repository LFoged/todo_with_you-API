'use strict';

// own modules
const usersCtrl = require('./controllers_users');
const objIdCheck = require('../../middleware/objId_check');
const { isAuthenticated } = require('../../middleware/auth_check');
const { validateUpdateUser } = require('../../middleware/validation_common');


// define & export route endpoints, methods & handlers (middleware)
module.exports = [
  {
    // GET - '/api/users' => get all users - only in DEV
    method: 'GET',
    path: '/',
    handlers: [usersCtrl.getAllUsers]
  },
  {
    // GET - '/api/users/:id' => get one user
    method: 'GET',
    path: '/:id',
    handlers: [objIdCheck, usersCtrl.getUser]
  },
  {
    // PUT - '/api/users/:id' => update one user
    method: 'PUT',
    path: '/:id',
    handlers: [
      objIdCheck,
      isAuthenticated,
      validateUpdateUser,
      usersCtrl.updateUser
    ]
  },
  {
    // DELETE - '/api/users/:id' => remove (delete) one user
    method: 'DELETE',
    path: '/:id',
    handlers: [objIdCheck, isAuthenticated, usersCtrl.removeUser]
  }
];
