'use strict';

// npm modules
const { Router } = require('express');
// own modules
const authRoutes = require('../components/auth/routes_auth');


// pass instantiated router to routes
module.exports = (app) => {
  // routes
  app.use('/api/auth', authRoutes(Router()));
};
