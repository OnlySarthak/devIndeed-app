const express = require('express');
const candidateProfileRouter = express.Router();

candidateProfileRouter.get('/details')
candidateProfileRouter.put('/details')
candidateProfileRouter.get('/resume')
candidateProfileRouter.get('/applied')
candidateProfileRouter.get('/premium')
candidateProfileRouter.put('/resume')

module.exports = candidateProfileRouter;