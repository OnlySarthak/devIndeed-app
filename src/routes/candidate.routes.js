const express = require('express');

const candidateRouter = express.Router();

candidateRouter.get('/job-list:filters')
candidateRouter.get('/view-company:companyId')
candidateRouter.get('/apply-company:companyId')
candidateRouter.get('profile')
candidateRouter.get('profile/resume')
candidateRouter.get('profile/applied')
candidateRouter.get('profile/premium')


