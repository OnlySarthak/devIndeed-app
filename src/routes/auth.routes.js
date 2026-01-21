const express = require('express');
const { validateLogin, validateRegistrationData } = require('../utils/validators/authdata.validator.js');
const authRouter = express.Router();
const user = require('../models/auth/auth.model');
const bcrypt = require('bcrypt');
const { login, register ,logout} = require('../controllers/auth.controller.js');

authRouter.post('/login', login);

authRouter.post('/register', register);

authRouter.post('/logout', logout);

module.exports = authRouter;