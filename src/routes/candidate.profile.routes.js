const express = require('express');
const candidateProfileRouter = express.Router();
const {
    listOfApplicationsforCandidate,
    deleteApplication
} = require('../controllers/candidate.application.controller');
const {
  validateCreateCandidateProfile,
  validateUpdateCandidateProfile
} = require('../middlewares/validators/candidateProfile.validator');

const {
  createCandidateProfile,
  updateProfileDetails,
  getProfileDetails,
  checkPremiumAccess,
  enablePremiumAccess
} = require('../controllers/candidate.profile.controller');

candidateProfileRouter.put('/createCandidateProfile', validateCreateCandidateProfile, createCandidateProfile);

candidateProfileRouter.put('/details', validateUpdateCandidateProfile, updateProfileDetails);
candidateProfileRouter.get('/details', getProfileDetails);

candidateProfileRouter.get('/premium', checkPremiumAccess);
candidateProfileRouter.put('/premium', enablePremiumAccess);

candidateProfileRouter.get('/status', listOfApplicationsforCandidate);
candidateProfileRouter.delete('/status/:applicationId', deleteApplication);
module.exports = candidateProfileRouter;

// candidateProfileRouter.get('/resume')
