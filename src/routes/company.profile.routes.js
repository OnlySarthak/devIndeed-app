const {express} = require('express');
const companyProfileRouter = express.Router();
const { validateCreateCompanyProfile
    , validateUpdateCompanyProfile
} = require('../middlewares/validators/company.profile.validator');

const { createCompanyProfile,
    getCompanyProfileByUserId,
    updateCompanyProfile,
    deleteCompanyProfile } = require('../controllers/company.profile.controller');

companyProfileRouter.post('/create', validateCreateCompanyProfile, createCompanyProfile);

companyProfileRouter.get('/view/', getCompanyProfileByUserId);

companyProfileRouter.put('/update/', validateUpdateCompanyProfile, updateCompanyProfile);

companyProfileRouter.delete('/delete/', deleteCompanyProfile);

module.exports = companyProfileRouter;


