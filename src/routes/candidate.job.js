const express = require('express');
const { verifyApplicationData } = require('../services/application.services');
const candidateJobRouter = express.Router();
const applicationModel = require('../models/applications/application.model');

candidateJobRouter.post('/apply-company/:companyId', (req, res) => {
    try{
        currCandidateId = req.user.id;
        const companyId = req.params.companyId;

        verifyApplicationData(currCandidateId, companyId);

        applicationModel.create({
            candidateId: currCandidateId,
            jobId: companyId,
        }).
        then((newApplication) => {
            res.status(201).json({ message: 'Application submitted successfully' });
        }).catch((error) => {
            res.status(500).json({ error: 'Failed to submit application' });
        });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
})   // apply to job/company

// candidateJobRouter.get('/job-list/:filters')
//            // search & filters
// candidateJobRouter.get('/view-company/:companyId')     // company public profile

module.exports = candidateJobRouter;