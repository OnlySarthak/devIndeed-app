const express = require('express');
const companyRouter = express.Router();

const companyJobRouter = require('./company.job.routes');
const companyProfileRouter = require('./company.profile.routes');
const companyApplicantRouter = require('./company.applicant.routes');

const auth = require('../middlewares/auth');
companyRouter.use(auth);

companyRouter.use('/profile', companyProfileRouter);
companyRouter.use('/jobs', companyJobRouter);
companyRouter.use('/applicant', companyApplicantRouter);

module.exports = companyRouter;