'use strict';

// npm modules
const Joi = require('joi');


// private vars
const _validationErrorCheck = (objToCheck = {}, schema = {}) => {
  const { error } = Joi.validate(objToCheck, schema);
  return error ? error.details[0].message : false;
}


// check req.body using same schema for both register & login 
exports.validateRegisterLogin = (req, res, next) => {
  const schema = {
    email: Joi.string().email().min(5).max(50).trim().lowercase().required(),
    password: Joi.string().min(6).max(40).required()
  };
  const errorMsg = _validationErrorCheck(req.body, schema);

  return errorMsg ? next({ status: 400, message: errorMsg }) : next();
};
