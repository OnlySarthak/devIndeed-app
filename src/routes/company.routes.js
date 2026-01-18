const express = require('express');
const companyRouter = express.Router();

companyRouter.post('/post-job', )


companyRouter.get('/view-jobs', )
companyRouter.get('/view-jobs/history', )

companyRouter.get('/view-job/:id', )
companyRouter.put('/edit-job/:id', )
companyRouter.delete('/delete-job/:id', )

companyRouter.get('/applicants/:jobId', )

companyRouter.get('/applicant/:jobId/:applicantId', )
companyRouter.get('/applicant/:jobId/:applicantId', )
companyRouter.get('/applicant/:jobId/:applicantId:/status', )

companyRouter.get('/company-profile', )
companyRouter.put('/company-profile', )