'use strict';

// npm modules
const { Router } = require('express');
// own modules
const usersCtrl = require('./controllers_users');
const objIdCheck = require('../../middleware/objId_check');
const { validateUpdateUser } = require('../validation_common');
const { isAuthenticated } = require('../../middleware/auth_check');

// instantiate router
const router = Router();


// GET - '/api/users' => get all users - DEV
router.get('/', [usersCtrl.getUsers]);

// GET - '/api/users/:id' => get one user
router.get('/:id', [objIdCheck, usersCtrl.getUser]);

// PUT - '/api/users/:id' => update one user
router.get('/:id', [
  objIdCheck,
  isAuthenticated,
  validateUpdateUser,
  usersCtrl.updateUser
]);

// DELETE - '/api/users/:id' => remove (delete) one user
router.delete('/:id', [objIdCheck, isAuthenticated, usersCtrl.removeUser]);


module.exports = router;
