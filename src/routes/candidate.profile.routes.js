const express = require('express');
const candidateProfileRouter = express.Router();
const validateCandidateProfile = require('../utils/validators/candidateProfile.validator');
const mongoose = require('mongoose');
const candidateProfile = require('../models/profiles/candidateProfile.model');

candidateProfileRouter.put('/details' , (req, res) => {
    try{
        //validate data
        validateCandidateProfile(req.body);

        //update candidate profile in DB
        const currCandidateId = mongoose.Types.ObjectId(req.user.id);

        candidateProfile.findOneAndUpdate(
            { candidateId: currCandidateId },
            { ...req.body },
            { new: true, upsert: true }
        ).then(updatedProfile => {
            res.status(200).json({
                message: "Profile updated successfully",
                profile: updatedProfile
            });
        }).catch(err => {
            res.status(500).json({ error: "Database update failed", details: err.message });
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

candidateProfileRouter.get('/details', (req, res) => {
    try {
        const currCandidateId = mongoose.Types.ObjectId(req.user.id);

        candidateProfile.findOne({ candidateId: currCandidateId })
            .then(profile => {
                if (!profile) {
                    return res.status(404).json({ error: "Profile not found" });
                }
                res.status(200).json(profile);
            })
            .catch(err => {
                res.status(500).json({ error: "Database query failed", details: err.message });
            });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


candidateProfileRouter.get('/premium', (req, res) => {
    try {
        const currCandidateId = mongoose.Types.ObjectId(req.user.id);

        candidateProfile.findOne({
            candidateId: currCandidateId,
            isPremium: true
        })
        .then(profile => {
                if (!profile) {
                    return res.status(403).json({ error: "no premium access" });
                }
                else {
                    return res.status(200).json({ message: "premium access granted" });
                }
            }
        )
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
});

candidateProfileRouter.put('/premium', (req, res) => {
    try {
        const currCandidateId = mongoose.Types.ObjectId(req.user.id);

        candidateProfile.findOneAndUpdate({
            candidateId: currCandidateId,
            isPremium: true
        })
        .then(profile => {
                    return res.status(200).json({ message: "premium access granted" });
        });
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = candidateProfileRouter;


// candidateProfileRouter.get('/resume')
// candidateProfileRouter.get('/applied', (req, res) => {
//     try{
//         const currCandidateId = mongoose.Types.ObjectId(req.user.id);

//         application.find({ candidateId: currCandidateId })
//             .then(applications => {

//     }