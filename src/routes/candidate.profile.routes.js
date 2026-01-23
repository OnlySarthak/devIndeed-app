const express = require('express');
const candidateProfileRouter = express.Router();
const {
    listOfApplicationsforCandidate,
    deleteApplication
} = require('../controllers/candidate.application.controller');

const {
  updateProfileDetails,
  getProfileDetails,
  checkPremiumAccess,
  enablePremiumAccess
} = require('../controllers/candidate.controller');



candidateProfileRouter.put('/details', updateProfileDetails);
candidateProfileRouter.get('/details', getProfileDetails);

candidateProfileRouter.get('/premium', checkPremiumAccess);
candidateProfileRouter.put('/premium', enablePremiumAccess);

candidateProfileRouter.get('/status', listOfApplicationsforCandidate);
candidateProfileRouter.delete('/status/:applicationId', deleteApplication);
module.exports = candidateProfileRouter;

// candidateProfileRouter.get('/resume')
