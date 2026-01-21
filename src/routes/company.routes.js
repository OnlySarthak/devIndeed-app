const express = require('express');
const companyJobRouter = require('./company.job.routes');
const auth = require('../middlewares/auth');

const companyRouter = express.Router();
companyRouter.use(auth);

companyRouter.use('/jobs', companyJobRouter);
// const companyApplicantRouter = require('./company.applicant.routes');

// companyRouter.use('/applicant', companyApplicantRouter);

// companyRouter.get('/company-profile', )
// companyRouter.put('/company-profile', )

module.exports = companyRouter;