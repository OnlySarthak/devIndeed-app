const express = require('express');
const candidateProfileRouter = express.Router();
const listOfApplicationsforCandidate = require('../controllers/application.controller').listOfApplicationsforCandidate;

const {
  updateProfileDetails,
  getProfileDetails,
  checkPremiumAccess,
  enablePremiumAccess
} = require('../controllers/candidateProfile.controller');

candidateProfileRouter.put('/details', updateProfileDetails);
candidateProfileRouter.get('/details', getProfileDetails);

candidateProfileRouter.get('/premium', checkPremiumAccess);
candidateProfileRouter.put('/premium', enablePremiumAccess);

candidateProfileRouter.get('/status', listOfApplicationsforCandidate);

module.exports = candidateProfileRouter;

// candidateProfileRouter.get('/resume')
