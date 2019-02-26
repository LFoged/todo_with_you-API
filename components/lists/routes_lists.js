'use strict';

// own modules
const listsCtrl = require('./controllers_lists');
const objIdCheck = require('../../middleware/objId_check');
const { isAuthenticated } = require('../../middleware/auth_check');


// define & export route endpoints, methods & handlers (middleware)
module.exports = [
  {
    // POST - '/api/lists' => create new list
    method: 'POST',
    path: '/',
    handlers: [isAuthenticated, listsCtrl.createList]
  },
  {
    // GET - '/api/lists' => get all lists - only in DEV
    method: 'GET',
    path: '/',
    handlers: [listsCtrl.getAllLists]
  },
  {
    // GET - '/api/lists/:listId' => get one list
    method: 'GET',
    path: '/:listId',
    handlers: [objIdCheck, isAuthenticated, listsCtrl.getList]
  },
  {
    // GET - '/api/lists/users/:id' => get all of 1 user's lists
    method: 'GET',
    path: '/users/:id',
    handlers: [objIdCheck, isAuthenticated, listsCtrl.getUserLists]
  },
  {
    // PUT - '/api/lists/:listId' => update one list
    method: 'PUT',
    path: '/:listId',
    handlers: [objIdCheck, isAuthenticated, listsCtrl.updateList]
  },
  {
    // DELETE - '/api/lists/:listId' => remove (delete) one list
    method: 'DELETE',
    path: '/:listId',
    handlers: [objIdCheck, isAuthenticated, listsCtrl.removeList]
  }
];
