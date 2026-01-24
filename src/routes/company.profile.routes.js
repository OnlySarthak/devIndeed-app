const express = require('express');
const companyProfileRouter = express.Router();
const {
  validateCreateCompanyProfile,
  validateUpdateCompanyProfile
} = require('../middlewares/validators/companyProfile.validator');

const { createCompanyProfile,
    getCompanyProfile,
    updateCompanyProfile} = require('../controllers/company.profile.controller');

companyProfileRouter.post('/create', validateCreateCompanyProfile, createCompanyProfile);

companyProfileRouter.get('/view' ,getCompanyProfile);

companyProfileRouter.put('/update/', validateUpdateCompanyProfile, updateCompanyProfile);

// companyProfileRouter.delete('/delete/', deleteCompanyProfile);

module.exports = companyProfileRouter;


