const companyProfileModel = require('../models/profiles/companyProfile.model');
const validateCompanyProfile = require('../validators/companyProfile.validator');

const createCompanyProfile = (req, res) => {
    try{
        const userId = req.user.id;
        const {  name, type, logoUrl, description, location, website, phone } = req.body;

        //validate profile data
        const { error } = validateCompanyProfile(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        //create new profile
        const newProfile = new companyProfileModel({
            userId,
            name,
            type,
            logoUrl,
            description,
            location,
            website,
            phone,
        });

        newProfile.save()
        .then(profile => res.status(201).json(profile))
        .catch(err => res.status(500).json({ message: 'Server Error', error: err.message }));
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }   

};

const getCompanyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await companyProfileModel.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

const updateCompanyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, type, logoUrl, description, location, website, phone } = req.body;

        //validate profile data
        const { error } = validateCompanyProfile(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        //update profile
        const updatedProfile = await companyProfileModel.findOneAndUpdate(
            { userId },
            { name, type, logoUrl, description, location, website, phone },
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(updatedProfile);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

module.exports = {
    createCompanyProfile,
    getCompanyProfile,
    updateCompanyProfile
};


