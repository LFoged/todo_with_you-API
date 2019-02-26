'use strict';

// npm modules
// mongoose module method for validating 'bson ObjIDs'
const { isValid } = require('mongoose').Types.ObjectId;


// check for correctly formatted 'bson ObjID'
module.exports = (req, res, next) => {
  const { id, listId } = req.params;

  return (
    (id && !isValid(id)) || (listId && !isValid(listId))
      ? next({ status: 400, message: 'Invalid URL path' })
      : next()
  );
};
