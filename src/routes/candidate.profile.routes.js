const express = require('express');
const candidateProfileRouter = express.Router();

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

module.exports = candidateProfileRouter;

// candidateProfileRouter.get('/resume')
// candidateProfileRouter.get('/applied', (req, res) => {
//     try{
//         const currCandidateId = mongoose.Types.ObjectId(req.user.id);

//         application.find({ candidateId: currCandidateId })
//             .then(applications => {

//     }