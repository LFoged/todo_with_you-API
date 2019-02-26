'use strict';

// own modules
const { createUser, findUser } = require('../users/services_users');
const { hashPassword, checkPassword } = require('../../utils');


// register new user
exports.registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (await findUser({ email })) {
    return next({ status: 409, message: 'User already exists' });
  }

  // hash password separately = no risk of 'user.password: false'
  const hashedPassword = await hashPassword(password);
  if (!hashedPassword) {
    return next({ status: 500, message: 'Registration failed' });
  }

  const newUser = await createUser({ email, hashedPassword });
  if (!newUser) {
    return next({ status: 500, message: 'Registration failed' });
  }

  const authToken = await newUser.createAuthToken();
  if (typeof authToken !== 'string') {
    return res.status(201).json({ message: 'Registered! Please log in' });
  }

  return res.status(201).header('Authorization', authToken).json({
    message: 'Registration successful',
    data: { id: newUser._id }
  });
};

// log user in
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // send obscure fail message on wrong email / password
  const user = await findUser({ email, limit: false });
  if (!user) {
    return next({ status: 401 });
  }

  if (!await checkPassword(password, user.password)) {
    return next({ status: 401 });
  }

  const authToken = await user.createAuthToken();
  if (typeof authToken !== 'string') {
    return next({ status: 500, message: 'Login failed' });
  }

  return res.header('Authorization', authToken).json({
    message: 'Login successful',
    data: { id: user._id }
  });
};
