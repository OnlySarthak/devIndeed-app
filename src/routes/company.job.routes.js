const express = require('express');
const companyJobRouter = express.Router();
const { createJob, 
    getAllJobs, 
    getAllHistoryJobs, 
    getJobById, 
    updateJob, 
    deleteJob } = require('../controllers/company.job.controller');
const { validateCreateJob, 
    validateUpdateJob } = require('../middlewares/validators/company.job.validator');


companyJobRouter.post('/create', validateCreateJob, createJob);

companyJobRouter.get('/lists', getAllJobs);

companyJobRouter.get('/listOfHistoryJobs', getAllHistoryJobs);

companyJobRouter.get('/view/:id', getJobById);

companyJobRouter.put('/update/:id', validateUpdateJob, updateJob);

companyJobRouter.delete('/delete/:id', deleteJob);

module.exports = companyJobRouter;
