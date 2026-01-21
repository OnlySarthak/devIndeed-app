const mongoose = require('mongoose');
const candidateProfile = require('../models/profiles/candidateProfile.model');
const validateCandidateProfile = require('../utils/validators/candidateProfile.validator');

const updateProfileDetails = async (req, res) => {
  try {
    // validate data
    validateCandidateProfile(req.body);

    const currCandidateId = new mongoose.Types.ObjectId(req.user.id);

    const updatedProfile = await candidateProfile.findOneAndUpdate(
      { candidateId: currCandidateId },
      { ...req.body },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProfileDetails = async (req, res) => {
  try {
    const currCandidateId = new mongoose.Types.ObjectId(req.user.id);

    const profile = await candidateProfile.findOne({
      candidateId: currCandidateId
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json(profile);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const checkPremiumAccess = async (req, res) => {
  try {
    const currCandidateId = new mongoose.Types.ObjectId(req.user.id);

    const profile = await candidateProfile.findOne({
      candidateId: currCandidateId,
      isPremium: true
    });

    if (!profile) {
      return res.status(403).json({ error: "no premium access" });
    }

    return res.status(200).json({ message: "premium access granted" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const enablePremiumAccess = async (req, res) => {
  try {
    const currCandidateId = new mongoose.Types.ObjectId(req.user.id);

    await candidateProfile.findOneAndUpdate(
      { candidateId: currCandidateId },
      { isPremium: true },
      { new: true }
    );

    return res.status(200).json({ message: "premium access granted" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  updateProfileDetails,
  getProfileDetails,
  checkPremiumAccess,
  enablePremiumAccess,
  applyToJob
};
