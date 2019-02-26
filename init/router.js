'use strict';

// own modules
const authRoutes = require('../components/auth/routes_auth');
const usersRoutes = require('../components/users/routes_users');
const listsRoutes = require('../components/lists/routes_lists');


// register routes when invoked by 'app'
module.exports = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/lists', listsRoutes);
};
