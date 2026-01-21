const express = require('express');
const candidateApplicationsRouter = express.Router();
const { listOfApplicationsforCandidate } = require('../controllers/application.controller');
const { isCandidate } = require('../middlewares/auth.middleware');

candidateApplicationsRouter.use(isCandidate);   

candidateApplicationsRouter.get('/', listOfApplicationsforCandidate);
