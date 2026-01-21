const express = require('express');
const companyApplicantRouter = express.Router();
const {
    createOrUpdateApplication,
    getApplicantDetails,
    listOfApplicants
} = require('../controllers/application.controller');

companyApplicantRouter.get('/list/:jobId', listOfApplicants);

companyApplicantRouter.get('/:jobId/:applicantId', getApplicantDetails);

//create or updata applicant status
companyApplicantRouter.put('/:jobId/:applicantId:/status', createOrUpdateApplication);

module.exports = companyApplicantRouter;