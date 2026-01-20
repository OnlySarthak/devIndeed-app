const express = require('express');
const companyRouter = express.Router();
const companyJobRouter = require('./company.job.routes');
// const companyApplicantRouter = require('./company.applicant.routes');

// companyRouter.use('/jobs', companyJobRouter);
// companyRouter.use('/applicant', companyApplicantRouter);

// companyRouter.get('/company-profile', )
// companyRouter.put('/company-profile', )

module.exports = companyRouter;