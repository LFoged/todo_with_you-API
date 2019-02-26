'use strict';

/* group util functions in single file for now (v. few needed in app) */

// npm modules
const bcrypt = require('bcryptjs');


// hash password (string) - 13 'salt' rounds
exports.hashPassword = (data = '') => bcrypt.hash(data, 13);
// compare password (string) to hashed one
exports.checkPassword = (data = '', hashedData = '') => {
  return bcrypt.compare(data, hashedData);
};

// check if in DEV env.
exports.inDEV = (process.env.NODE_ENV !== 'production');
