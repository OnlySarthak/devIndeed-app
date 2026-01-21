const express = require('express');
const candidateJobRouter = express.Router();
const { applyToJob,
    listAvailableJobs,
    viewJobDetails
 } = require('../controllers/candidate.job.controller');

candidateJobRouter.get('/', listAvailableJobs)  // list all available jobs

candidateJobRouter.get('/:jobId' , viewJobDetails)  // view job details

candidateJobRouter.post('/apply/:jobId', applyToJob)   // apply to job/company

module.exports = candidateJobRouter;