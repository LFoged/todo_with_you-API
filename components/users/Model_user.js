'use strict';

// npm modules
const Mongoose = require('mongoose');
const Jwt = require('jsonwebtoken');
const Config = require('config');
const UniqueValidator = require('mongoose-unique-validator');

// define User schema
const UserSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: 'Email address required',
    unique: true,
    minlength: [5, 'That email looks suspiciously short'],
    maxlength: [50, 'That is a really long email address'],
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: 'Passwords save puppies, please use one',
    minlength: [6, 'Password must be min. 6 characters'],
    maxlength: [80, 'Password too long'],
  }
}, {
    timestamps: true
  });


// register plugin to get proper errors from Mongo on 'unique' violation
UserSchema.plugin(UniqueValidator);

// define method for creating auth token (JWT) on User schema
UserSchema.methods.createAuthToken = function () {
  const payload = { id: this._id, email: this.email };

  // use Promise format to make jwt.sign async (Note: 'promisify' won't work)
  return new Promise((resolve, reject) => {
    Jwt.sign(
      payload,
      Config.get('userJwtKey'),
      { expiresIn: '2h' },
      (error, encodedJwt) => {
        if (error) {
          reject(error);
        }
        resolve(encodedJwt);
      }
    );
  });
};


// model User schema & export
module.exports = Mongoose.model('User', UserSchema);
