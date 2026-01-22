const express = require('express');
const companyJobRouter = express.Router();
const { createJob, 
    getAllJobs, 
    getAllHistoryJobs, 
    getJobById, 
    updateJob, 
    deleteJob } = require('../controllers/company.job.controller');


companyJobRouter.post('/create', createJob);

companyJobRouter.get('/lists', getAllJobs);

companyJobRouter.get('/listOfHistoryJobs', getAllHistoryJobs);

companyJobRouter.get('/view/:id', getJobById);

companyJobRouter.put('/update/:id', updateJob);

companyJobRouter.delete('/delete/:id', deleteJob);

module.exports = companyJobRouter;
