'use strict';

// own modules
const { findUser, createUser } = require('./services_auth');
const { hashPassword, checkPassword } = require('../../utils/encrypt');


// register new user
exports.registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (await findUser({ email })) {
    return next({ status: 409, message: 'User already exists' });
  }

  const newUser = await createUser({
    email,
    hashedPassword: await hashPassword(password)
  });
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
  const user = await findUser({ email });
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

  return res.status(200).header('Authorization', authToken).json({
    message: 'Login successful',
    data: { id: user._id }
  });
};
