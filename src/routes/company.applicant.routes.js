const express = require('express');
const companyApplicantRouter = express.Router();
const {
    getApplicantDetails,
    listOfApplicants,
    updateApplication
} = require('../controllers/company.application.controller');

companyApplicantRouter.get('/list/:jobId', listOfApplicants);

companyApplicantRouter.get('/:jobId/:applicantId', getApplicantDetails );

//create or update applicant status
companyApplicantRouter.put('/:jobId/:applicantId',(req, res, next)=>{
    const { jobId, applicantId } = req.params;
    console.log("1. Received request to update application for jobId:", jobId, "and applicantId:", applicantId);
    next();
}, updateApplication);

module.exports = companyApplicantRouter;