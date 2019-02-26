'use strict';

// npm modules
const { Router } = require('express');
// own modules
const authRoutes = require('../components/auth/routes_auth');
const usersRoutes = require('../components/users/routes_users');
const listsRoutes = require('../components/lists/routes_lists');


// register routes w/ separate router for each Array of routes
const _registerRoutes = (routes) => {
  const router = Router();

  routes.forEach((endpoint) => {
    const { method, path, handlers } = endpoint;
    return router[method.toLowerCase()](path, handlers);
  });

  return router;
};


// register (& invoke) routes & route handlers
module.exports = (app) => {
  app.use('/api/auth', _registerRoutes(authRoutes));
  app.use('/api/users', _registerRoutes(usersRoutes));
  app.use('/api/lists', _registerRoutes(listsRoutes));

  // 404 error handler - triggered if none of above routes match req
  app.use((req, res, next) => next({ status: 404 }));
};
