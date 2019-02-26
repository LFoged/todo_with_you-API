'use strict';

// own modules
const {
  saveList,
  getList,
  getLists,
  mayEditList,
  deleteList
} = require('./services_lists');


// return all lists - only in DEV
exports.getAllLists = async (req, res, next) => {
  const lists = await getLists({ singleUser: false });
  if (!lists) {
    return next({ status: 400, message: 'Invalid URL path' })
  }
  if (lists.length < 1) {
    return res.status(404).json({ message: 'No lists found' });
  }

  return res.json({ data: lists });
};


// create new list
exports.createList = async (req, res, next) => {
  const { id } = req.userAuth;

  const newList = await saveList({ authorId: id, ...req.body }, true);
  if (!newList) {
    return next({ status: 500, message: 'Failed to save list' });
  }

  return res.status(201).json({
    message: 'List saved!',
    data: { ...newList }
  });
};


// return single list
exports.getList = async (req, res, next) => {
  const { id } = req.userAuth;
  const { listId } = req.params;

  const { error, ...list } = await getList({ listId, id });
  if (error) {
    return next({ status: 403, message: 'User not authorized to access list' });
  }
  if (!list) {
    return res.status(404).json({ message: 'List not found' });
  }

  return res.json({ data: list });
};


// return all lists for single user (user = author & canView + canEdit)
exports.getUserLists = async (req, res, next) => {
  const { id } = req.userAuth;

  const userLists = await getLists({ id });
  if (!userLists || userLists.length < 1) {
    return res.status(404).json({ message: 'No lists found' });
  }

  return res.json({ data: userLists });
};


// update list
exports.updateList = async (req, res, next) => {
  const { id } = req.userAuth;
  const listObj = { ...req.body };

  const mayUpdateList = mayEditList(listObj, id);
  if (!mayUpdateList) {
    return next({ status: 403, message: 'User not authorized to edit list' });
  }

  const updatedList = await saveList({ ...req.body, lastEditedBy: id });
  if (!updatedList) {
    return next({ status: 500, message: 'Failed to update list' });
  }

  return res.status(201).json({ data: updatedList });
};


// remove (delete) list
exports.removeList = async (req, res, next) => {
  const { id } = req.userAuth;
  const { listId } = req.params;

  const { error, ...list } = await getList({ listId, id });
  if (error) {
    return next({ status: 403, message: 'User not authorized to edit list' });
  }
  if (!list) {
    return res.status(404).json({ message: 'List not found' });
  }

  const deletedList = await deleteList(list);
  if (!deletedList) {
    return next({ status: 500, message: 'Failed to remove list' });
  }

  return res.json({ message: 'List successfully removed' });
};
