const {express} = require('express');
const companyProfileRouter = express.Router();

const { createCompanyProfile,
    getCompanyProfileByUserId,
    updateCompanyProfile,
    deleteCompanyProfile } = require('../controllers/company.profile.controller');

companyProfileRouter.post('/create', createCompanyProfile);

companyProfileRouter.get('/view/', getCompanyProfileByUserId);

companyProfileRouter.put('/update/', updateCompanyProfile);

companyProfileRouter.delete('/delete/', deleteCompanyProfile);

module.exports = companyProfileRouter;


