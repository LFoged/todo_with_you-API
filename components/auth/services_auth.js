'use strict';

// own modules
const User = require('../users/Model_user');


exports.createUser = async ({ email, hashedPassword }) => {
  return (await new User({ email, password: hashedPassword })) || false;
};


// find single user by email or id
exports.findUser = async ({ email = '', id = '' }) => {
  if (email.length > 0) {
    return (await User.findOne({ email })) || false;
  }

  return (await User.findById(id)) || false;
};


