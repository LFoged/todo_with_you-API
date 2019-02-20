'use strict';

// npm modules
const { connect } = require('mongoose');


// connect to DB & log success / error to console. Throw errors
module.exports = (config) => {
  return connect(config.get('db'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => console.log('DB CONNECTED!'))
    .catch((error) => {
      console.log('FATAL ERROR: DB NOT CONNECTED');
      throw error;
    });
};
