'use strict';

// own modules
const User = require('./Model_user');
const { inDEV } = require('../../utils');


// create (register) user in db - used by auth controller
exports.createUser = async ({ email, hashedPassword }) => {
  return (await new User({ email, password: hashedPassword }).save());
};

// get all users (only in DEV) or 1 user by id / email. Can limit returned data 
exports.findUser = async ({
  single = true,
  limit = true,
  id = '',
  email = ''
}) => {
  const projection = limit ? { password: 0, createdAt: 0, __v: 0 } : {};

  if (!single && inDEV) {
    return (await User.find({}, projection));
  }

  if (email.length > 1) {
    return (await User.findOne({ email }, projection));
  }

  return (await User.findOne({ _id: id }, projection));
};

// save user
exports.saveUser = async (user) => (await user.save());

// delete (remove) one user
exports.deleteUser = async (id) => (await User.findByIdAndDelete(id));
