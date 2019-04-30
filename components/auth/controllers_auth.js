'use strict';

// own modules
const { saveUser, findUser } = require('../users/services_users');
const { hashPassword, checkPassword } = require('../../utils');


// register new user
exports.registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (await findUser({ email })) {
    return next({ status: 409, message: 'User already exists' });
  }

  // hash password separately => if error here, no corrupted User data
  const hashedPassword = await hashPassword(password);
  if (!hashedPassword) {
    return next({ status: 500, message: 'Registration failed' });
  }

  const newUser = await saveUser({ email, password: hashedPassword }, true);
  if (!newUser) {
    return next({ status: 500, message: 'Registration failed' });
  }

  // still successfully registered if here, despite token fail
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
  if (!user || !(await checkPassword(password, user.password))) {
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
