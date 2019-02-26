'use strict';

// npm modules
const { Router } = require('express');
// own modules
const listsCtrl = require('./controllers_lists');
const objIdCheck = require('../../middleware/objId_check');
const { isAuthenticated } = require('../../middleware/auth_check');

// instantiate router
const router = Router();


// POST - '/api/lists' => create new list
router.post('/', [isAuthenticated, listsCtrl.createList]);

// GET - '/api/lists' => get all lists - only in DEV
router.get('/', [listsCtrl.getAllLists]);

// GET - '/api/lists/:listId' => get one list
router.get('/:listId', [objIdCheck, isAuthenticated, listsCtrl.getOneList]);

// GET - '/api/lists/users/:id' get all of one user's lists
router.get('/users/:id', [
  objIdCheck,
  isAuthenticated,
  listsCtrl.getUserLists
]);

// PUT - '/api/lists/:listId' => update one list
router.put('/:listId', [objIdCheck, isAuthenticated, listsCtrl.updateList]);


// DELETE - '/api/lists/:listId' => remove (delete) one list
router.delete('/:listId', [
  objIdCheck,
  isAuthenticated,
  listsCtrl.removeList
]);


module.exports = router;
