const express = require('express');
const companyApplicantRouter = express.Router();
const {
    createOrUpdateApplication,
    getApplicantDetails,
    listOfApplicants
} = require('../controllers/application.controller');

//middleware for role checking 
//it is because application is the thing both company and candidate deal with
const { isCompany } = require('../middlewares/roleCheckers');

//apply middleware to all routes in this router
companyApplicantRouter.use(isCompany);

companyApplicantRouter.get('/list/:jobId', listOfApplicants);

companyApplicantRouter.get('/:jobId/:applicantId', getApplicantDetails);

//create or updata applicant status
companyApplicantRouter.put('/:jobId/:applicantId:/status', createOrUpdateApplication);

module.exports = companyApplicantRouter;