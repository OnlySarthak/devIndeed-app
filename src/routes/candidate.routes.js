const express = require('express');
const candidateProfileRouter = require('./candidate.profile.routes');
const candidateRouter = express.Router();
const auth = require('../middlewares/auth');
const candidateJobRouter = require('./candidate.job');

// Middleware to protect routes
candidateProfileRouter.use(auth);
candidateJobRouter.use(auth);

candidateRouter.use('/profile', candidateProfileRouter);
candidateRouter.use('/jobs', candidateJobRouter);

module.exports = candidateRouter;
