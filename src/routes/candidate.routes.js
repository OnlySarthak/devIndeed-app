const express = require('express');
const candidateProfileRouter = require('./candidate.profile.routes');

const candidateRouter = express.Router();
const candidateJobRouter = require('./candidate.job');
const auth = require('../middlewares/auth');
const { isCandidate} = require('../middlewares/roleCheckers');

// Middleware to protect routes
candidateRouter.use(auth);

// Middleware to check candidate role
candidateRouter.use(isCandidate);

candidateRouter.use('/profile', candidateProfileRouter);
candidateRouter.use('/jobs', candidateJobRouter);

module.exports = candidateRouter;
