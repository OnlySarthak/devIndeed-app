const express = require('express');
const companyJobRouter = express.Router();

companyJobRouter.post('/', createJob);

companyJobRouter.get('/', getAllJobs);

companyJobRouter.get('/:id', getJobById);

companyJobRouter.put('/:id', updateJob);

companyJobRouter.delete('/:id', deleteJob);

module.exports = companyJobRouter;
