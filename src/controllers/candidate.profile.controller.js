const mongoose = require('mongoose');
const candidateProfile = require('../models/profiles/candidateProfile.model');

const createCandidateProfile = async (req, res) => {
  try {
    const currCandidateUserId = req.user.id;
    const existingProfile = await candidateProfile.findOne({ userId: currCandidateUserId });

    console.log(currCandidateUserId ," ", existingProfile);
    
    console.log("candidate profile error");

    if (existingProfile) {
      return res.status(400).json({ error: "Profile already exists" });
    }

    const newProfile = new candidateProfile({
      userId: currCandidateUserId,
      ...req.body
    });
    await newProfile.save();
    res.status(201).json({
      message: "Profile created successfully",
      profile: newProfile
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProfileDetails = async (req, res) => {
  try {
    const currCandidateUserId = req.user.id;

    const updatedProfile = await candidateProfile.findOneAndUpdate(
      { userId: currCandidateUserId },
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
    const currCandidateUserId = req.user.id;

    const profile = await candidateProfile.findOne({
      userId: currCandidateUserId
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
    const currCandidateUserId = req.user.id;

    const profile = await candidateProfile.findOne({
      userId: currCandidateUserId,
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
    const currCandidateUserId = req.user.id;

    await candidateProfile.findOneAndUpdate(
      { userId: currCandidateUserId },
      { isPremium: true },
      { new: true }
    );

    return res.status(200).json({ message: "premium access granted" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCandidateProfile,
  updateProfileDetails,
  getProfileDetails,
  checkPremiumAccess,
  enablePremiumAccess,
};
