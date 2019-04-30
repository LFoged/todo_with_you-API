'use strict';

// custom default msg for required Http error codes
const httpErrors = {
  400: {
    type: 'Bad Request',
    defaultMsg: 'Request invalid. Please review and try again'
  },
  401: {
    type: 'Unauthorized',
    defaultMsg: 'Invalid access credentials'
  },
  402: {
    type: 'Payment Required',
    defaultMsg: 'Access to resources requires payment'
  },
  403: {
    type: 'Forbidden',
    defaultMsg: 'Access to resource denied'
  },
  404: {
    type: 'Not Found',
    defaultMsg: 'Requested URL not found'
  },
  405: {
    type: 'Method Not Allowed',
    defaultMsg: 'Request method not permitted'
  },
  409: {
    type: 'Conflict',
    defaultMsg: 'Request conflicts with existing resource'
  },
  500: {
    type: 'Internal Server Error',
    defaultMsg: 'A server error occurred. Please try later'
  },
  503: {
    type: 'Service Unavailable',
    defaultMsg: 'Server temporarily unable to respond. Please try later'
  }
};

// handle http httpErrors passed to 'next()'. Default statusCode = 500
module.exports = (app) => {
  app.use(({ status = 500, message = '' }, req, res, next) => {
    // if wrong data type / status not defined in 'internals', status = 500
    if ((typeof status !== 'number') || !httpErrors[status]) {
      status = 500;
    }

    // return error info in JSON format
    return res.status(status).json({
      statusCode: status,
      error: httpErrors[status].type,
      message: message || httpErrors[status].defaultMsg
    });
  });
};
