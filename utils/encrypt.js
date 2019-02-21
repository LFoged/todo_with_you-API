'use strict';

// npm modules
const bcrypt = require('bcryptjs');


// hash & compare methods, with predefined salt. Single implementation source 
exports.hashPassword = (data = '') => bcrypt.hash(data, 13);

exports.checkPassword = (data = '', hashedData = '') => {
  return bcrypt.compare(data, hashedData);
};