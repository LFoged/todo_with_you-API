'use strict';

// check for correctly formatted 'bson ObjID' if expected in params

// npm modules
const { isValid } = require('mongoose').Types.ObjectId;


module.exports = (req, res, next) => {
  const { id, listId } = req.params;

  return ((id && !isValid(id)) || (listId && !isValid(listId)))
    ? next({ status: 400, message: 'Invalid URL path' })
    : next();
};
