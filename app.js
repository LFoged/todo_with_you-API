'use strict';

// npm modules
const Express = require('express');
const Config = require('config');
const Helmet = require('helmet');
const Compression = require('compression');
require('express-async-errors'); // try / catch wrapper
// own modules
const {
  NodeErrorCatcher,
  ConfigValidate,
  CorsHeaders,
  Router,
  CustomHttpErrors,
  DbConnect,
  ServerStart
} = require('./init');


// handle unhandled exceptions & rejections | validate required ENV vars
NodeErrorCatcher();
ConfigValidate(Config);

// instantiate app
const app = Express();

// set security headers | compress http responses | register JSON parser
app.use(Helmet());
app.use(Compression());
app.use(Express.json());

// CORS settings / headers
CorsHeaders(app);
// register router & api routes
Router(app);
// 404 error handler - triggered if no matching routes (above)
app.use((req, res, next) => next({ status: 404 }));
// handle http (req / res) errors passed to 'next()' <= Express.js
CustomHttpErrors(app);


// connect to DB | start server AFTER DB is connected
DbConnect(Config)
  .then(() => ServerStart(app))
  .catch((error) => {
    throw error;
  });
