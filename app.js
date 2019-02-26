'use strict';

// npm modules
const express = require('express');
const config = require('config');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors'); // try / catch wrapper on req / res cycle
// own modules
const {
  nodeErrorCatcher,
  configValidate,
  corsHeaders,
  router,
  customHttpErrors,
  dbConnect
} = require('./init');


// handle unhandled exceptions & rejections | validate required ENV vars
nodeErrorCatcher();
configValidate(config);

// instantiate app | set port for app to listen on
const app = express();
const PORT = process.env.PORT || 5000;

// set security headers | compress http responses | register JSON parser
app.use(helmet());
app.use(compression());
app.use(express.json());

// apply CORS headers
corsHeaders(app);
// register router + api routes & handle 404 (non-existent routes) errors
router(app);
// custom handler for http errors passed to 'next()' (Express.js)
customHttpErrors(app);


// connect to DB | start server AFTER DB is connected
dbConnect(config)
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER LISTENING ON PORT: ${PORT}!`));
  })
  .catch((error) => {
    throw error;
  });
