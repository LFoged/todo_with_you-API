'use strict';

// npm modules
const { Router } = require('express');
// own modules
const authRoutes = require('../components/auth/routes_auth');


// instantiate Express Router
const _router = Router();

// attach handler for each path & method to router
const _registerRoutes = (routes, router) => {
  routes.forEach((route) => {
    const { method, path, handlers } = route;
    return router[method.toLowerCase()](path, handlers);
  });

  return router;
};


// register routes when invoked by 'app'
module.exports = (app) => {
  app.use('/api/auth', _registerRoutes(authRoutes, _router));
};
