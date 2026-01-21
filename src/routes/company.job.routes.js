const express = require('express');
const companyJobRouter = express.Router();
const { createJob, 
    getAllJobs, 
    getAllHistoryJobs, 
    getJobById, 
    updateJob, 
    deleteJob } = require('../controllers/job.controller');


companyJobRouter.post('/', createJob);

companyJobRouter.get('/', getAllJobs);

companyJobRouter.get('/', getAllHistoryJobs);

companyJobRouter.get('/:id', getJobById);

companyJobRouter.put('/:id', updateJob);

companyJobRouter.delete('/:id', deleteJob);

module.exports = companyJobRouter;
