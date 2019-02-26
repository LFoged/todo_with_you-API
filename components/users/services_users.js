'use strict';

// own modules
const User = require('./Model_user');
const { inDEV } = require('../../utils');


// save user to db - also used to save (register) new users
exports.saveUser = async (userObj, newUser = false) => {
  if (newUser) {
    return (await new User(userObj).save());
  }

  return (await userObj.save());
};


// get all users (only in DEV) or 1 user by id / email. Can limit returned data 
exports.findUser = async ({
  single = true,
  limit = true,
  id = '',
  email = ''
}) => {
  const projection = (limit ? { password: 0, createdAt: 0, __v: 0 } : {});

  if (!single) {
    return (inDEV ? (await User.find({}, projection)) : false);
  }

  if (email.trim().length > 0) {
    return (await User.findOne({ email }, projection));
  }

  return (
    (id.trim().length > 0) ? (await User.findById(id, projection)) : false
  );
};


// delete (remove) one user
exports.deleteUser = async (id) => (await User.findByIdAndDelete(id));
