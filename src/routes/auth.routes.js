const express = require('express');
const authRouter = express.Router();
const { login, register ,logout} = require('../controllers/auth.controller.js');
const { validateLoginData,
        validateRegistrationData
 } = require('../middlewares/validators/authdata.validator.js');

authRouter.post('/login',validateLoginData, login);

authRouter.post('/register', validateRegistrationData,register);

authRouter.post('/logout',logout);

module.exports = authRouter;