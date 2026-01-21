const express = require('express');
const candidateJobRouter = express.Router();
const { applyToJob } = require('../controllers/candidate.controller');

candidateJobRouter.post('/apply-company/:companyId', applyToJob)   // apply to job/company

// candidateJobRouter.get('/job-list/:filters')
//            // search & filters
// candidateJobRouter.get('/view-company/:companyId')     // company public profile

module.exports = candidateJobRouter;