const express = require('express');
const candidateProfileRouter = express.Router();
const candidateProfileController = require('../controllers/candidate.profile.controller');

candidateProfileRouter.get('/details')
candidateProfileRouter.put('/details',(req, res) => {
    )
candidateProfileRouter.get('/resume')
candidateProfileRouter.get('/applied')
candidateProfileRouter.get('/premium')
candidateProfileRouter.put('/resume')

module.exports = candidateProfileRouter;