'use strict';

// own modules
const List = require('./Model_list');
const { inDEV } = require('../../utils');


// check user permission to VIEW OR EDIT list
const _mayAccessList = (list = {}, id = '') => {
  const { authorId, canView, canEdit } = list;
  if (
    (String(id) !== authorId)
    || (!canView.includes(id))
    || (!canEdit.includes(id))
  ) {
    return false;
  }

  return true;
};


// check user permission to EDIT list
exports.mayEditList = (list = {}, id = '') => {
  return (list.authorId === String(id) || (list.canEdit.includes(String(id))));
};

// save (new or existing) list
exports.saveList = async (listObj = {}, newList = false) => {
  if (newList) {
    return (await new List(listObj).save());
  }

  return (await listObj.save());
};

// get single list by ID - check user access before returning
exports.getList = async ({ listId = '', id = '' }) => {
  const list = await List.findById(listId);
  if (!list) {
    return false;
  }
  const mayAccessList = _mayAccessList(list, id);
  if (!mayAccessList) {
    return { error: true };
  }

  return list;
};


// get multiple lists by user's id - check access - can get all in DEV 
exports.getLists = async ({ singleUser = true, id = '' }) => {
  if (!singleUser && !id && inDEV) {
    return (await List.find({}, { updatedAt: -1 }));
  }
  console.log('test')

  return (
    await List.find({
      $or: [
        { authorId: id }, { canView: { $in: [id] } }, { canEdit: { $in: [id] } }
      ]
    }, {
        updatedAt: -1
      })
  );
};


// delete list
exports.deleteList = async (listObj = {}) => (await listObj.delete()); 
