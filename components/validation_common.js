'use strict';

/* Validation needed on few routes - group in 1 file for now */

// npm modules
const Joi = require('joi');


// check target req. prop (obj) against schema for validation errors
const _validationErrorCheck = (objToCheck, schema) => {
  const { error } = Joi.validate(objToCheck, schema);
  return (error ? error.details[0].message : false);
};

// schemas
const _schemas = {
  registerLogin: {
    email: Joi.string().email().min(5).max(50).trim().lowercase().required(),
    password: Joi.string().min(6).max(40).required()
  },
  updateUser: {
    email: Joi.string().email().min(5).max(50).trim().lowercase(),
    password: Joi.string().min(6).max(40)
  },
  createList: {

  },
  updateList: {

  }
};


// use same schema for both register & login - target: req.body
exports.validateRegisterLogin = (req, res, next) => {
  const errorMsg = _validationErrorCheck(req.body, _schemas.registerLogin);
  return (errorMsg ? next({ status: 400, message: errorMsg }) : next());
};

// validate update user - target: req.body
exports.validateUpdateUser = (req, res, next) => {
  const errorMsg = _validationErrorCheck(req.body, _schemas.updateUser);
  return (errorMsg ? next({ status: 400, message: errorMsg }) : next());
};
