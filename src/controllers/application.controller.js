const applicationModel = require('../models/application/application.model');
const { verifyApplicationData } = require('../services/application.services');
const candidateProfileModel = require('../models/candidate/candidateProfile.model');

const createOrUpdateApplication = (req, res) => {
    try {
        //verify application data
        const isValid = verifyApplicationData(req.params.applicantId, req.user.id);

        if (!isValid) {
            return res.status(400).json({ error: "Invalid application data" });
        }

        //create or update application status
        const updatedApplication = applicationModel.findOneAndUpdate({
            candidateId: req.params.applicantId,
            jobId: req.params.jobId
        }, {
            status: req.body.status,
            updatedDate: Date.now()
        }, { new: true, upsert: true });

        return res.status(200).json(updatedApplication);
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

const getApplicantDetails = async (req, res) => {
    try {

        //fetch application details
        const application = await applicationModel.findOne({
            candidateId: req.params.applicantId,
            jobId: req.params.jobId
        });
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        //fetch candidate profile details
        const candidateDetails = await candidateProfileModel.findById(req.params.applicantId)
            .select('name email resume skills experience resume');

        application.candidateDetails = candidateDetails;

        return res.status(200).json(application);
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

const listOfApplicants = async (req, res) => {
    try {
        const application = await applicationModel
            .findOne({
                candidateId: req.params.applicantId,
                jobId: req.params.jobId
            })
            .populate({
                path: 'candidateId',
                select: 'email',
                populate: {
                    path: 'candidateProfile',
                    select: 'name resume skills experience'
                }
            });
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }
        return res.status(200).json(application);
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    createOrUpdateApplication,
    getApplicantDetails,
    listOfApplicants
};

