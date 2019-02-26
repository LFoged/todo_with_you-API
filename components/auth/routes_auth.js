'use strict';

// npm modules
const { Router } = require('express');
// own modules
const { registerUser, loginUser } = require('./controllers_auth');
const { isLoggedIn } = require('../../middleware/auth_check');
const { validateRegisterLogin } = require('../validation_common');

// instantiate router
const router = Router();


// POST - '/api/auth/register' => register new user
router.post('/register', [isLoggedIn, validateRegisterLogin, registerUser]);

// POST - '/api/auth/login' => log user in
router.post('/login', [isLoggedIn, validateRegisterLogin, loginUser]);


module.exports = router;
