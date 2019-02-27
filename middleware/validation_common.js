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
    title: Joi.string().min(1).max(50).trim().required(),
    body: Joi.string().min(3).max(500).trim().required(),
    tags: Joi.array().items(
      Joi.string().min(1).max(25).trim()
    ).max(6).default([]),
    isPublic: Joi.bool().default(false),
    canView: Joi.array().items(
      Joi.string().length(24).trim()
    ).max(10).default([]),
    canEdit: Joi.array().items(
      Joi.string().length(24).trim()
    ).max(10).default([])
  },
  updateList: {
    // almost same schema as createList - use destructuring for other props
    authorId: Joi.string().length(24).trim().required(),
    lastEditedBy: Joi.string().length(24).trim().required()
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

// validate create list - target: req.body
exports.validateCreateList = (req, res, next) => {
  const errorMsg = _validationErrorCheck(req.body, _schemas.createList);
  return (errorMsg ? next({ status: 400, message: errorMsg }) : next());
};

// validate create list - target: req.body
exports.validateUpdateList = (req, res, next) => {
  const updateSchema = { ..._schemas.updateList, ..._schemas.createList };

  const errorMsg = _validationErrorCheck(req.body, updateSchema);
  return (errorMsg ? next({ status: 400, message: errorMsg }) : next());
};
