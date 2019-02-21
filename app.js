'use strict';

// npm modules
const express = require('express');
const config = require('config');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors'); // try / catch wrapper
// own modules
const {
  nodeErrorCatcher,
  configValidate,
  corsHeaders,
  router,
  customHttpErrors,
  dbConnect,
  serverStart
} = require('./init');


// in development environment if not production
const DEV = process.env.NODE_ENV !== 'production';

// handle unhandled exceptions & rejections
nodeErrorCatcher();
// validate required ENV vars in DEV
if (DEV) {
  configValidate(config);
}

// instantiate app
const app = express();

// set security headers | compress http responses | register JSON parser
app.use(helmet());
app.use(compression());
app.use(express.json());

// CORS settings / headers
corsHeaders(app);
// register router & api routes
router(app);
// 404 error handler - triggered if no matching routes (above)
app.use((req, res, next) => next({ status: 404 }));
// handle http (req / res) errors passed to 'next()' <= Express.js
customHttpErrors(app);


// connect to DB | start server AFTER DB is connected
dbConnect(config)
  .then(() => serverStart(app))
  .catch((error) => {
    throw error;
  });
