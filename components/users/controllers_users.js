'use strict';

// own modules
const { findUser, saveUser, deleteUser } = require('./services_users');
const { checkPassword, hashPassword } = require('../../utils');


// return all users - DEV route only
exports.getUsers = async (req, res, next) => {
  const users = await findUser({ single: false });
  if (users.length < 1) {
    return res.status(404).json({ message: 'No users found' });
  }

  return res.json({ data: users });
};


// return one user
exports.getUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await findUser({ id });
  if (!user) {
    return res.status(404).json({ message: 'No matching user found' });
  }

  return res.json({ data: user });
};


// update user details
exports.updateUser = async (req, res, next) => {
  const { id } = req.userAuth; // set by 'isAuthenticated' middleware
  const { email, password, newPassword } = req.body;

  const user = await findUser({ id, limit: false });
  if (!user) {
    return res.status(404).json({ message: 'No matching user found' });
  }

  if (email) {
    user.email = email;
  }

  if (password || newPassword) {
    if (!password || !newPassword) {
      return next({ status: 400, message: 'Current & new password required' });
    }
    if (!await checkPassword(password, user.password)) {
      return next({ status: 401, message: 'Invalid password' });
    }
    const newHashedPassword = await hashPassword(newPassword);
    if (!newHashedPassword) {
      return next({ status: 500, message: 'User update failed' });
    }
    user.password = newHashedPassword;
  }

  const updatedUser = await saveUser(user);
  if (!updatedUser) {
    return next({ status: 500, message: 'User update failed' });
  }

  return res.status(201).json({ message: 'Update successful', data: { id } });
};


// remove one user
exports.removeUser = async (req, res, next) => {
  const { id } = req.params;

  const removedUser = await deleteUser(id);
  if (!removedUser) {
    return next({ status: 500, message: 'Failed to delete user' });
  }

  return res.status(200).json({ message: 'User successfully deleted ' });
};

