const express = require('express');
const candidateProfileRouter = require('./candidate.profile.routes');
const candidateRouter = express.Router();

candidateRouter.use('/profile', candidateProfileRouter);

candidateRouter.get('/job-list/:filters')           // search & filters
candidateRouter.get('/view-company/:companyId')     // company public profile
candidateRouter.post('/apply-company/:companyId')   // apply to job/company

module.exports = candidateRouter;
