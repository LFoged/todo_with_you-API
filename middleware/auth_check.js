'use strict';

// npm modules
const jwt = require('jsonwebtoken');
const config = require('config');


// deny access if NO valid token
exports.isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return next({ status: 401 });
  }

  // use cb (callback) format to make async (Note: 'promisify' won't work)
  jwt.verify(token, config.get('userJwtKey'), (error, decodedJwt) => {
    if (error || !decodedJwt) {
      return next({ status: 401 });
    }
    // check if 'id' in params. If present, check for matching id in decoded JWT
    if ((req.params.id) && (req.params.id !== String(decodedJwt.id))) {
      return next({ status: 403 });
    }
    // set contents of decodedJwt on req obj. so avail. to other middleware
    req.userAuth = decodedJwt;

    return next();
  });
};


// deny access if valid token (already logged in)
exports.isLoggedIn = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return next();
  }

  jwt.verify(token, config.get('userJwtKey'), (error, decodedJwt) => {
    if (error || !decodedJwt) {
      return next();
    }

    return next({ status: 401, message: 'Access restricted while logged in' });
  });
};
