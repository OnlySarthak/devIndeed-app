const applicationModel = require('../models/applications/application.model');
const { verifyApplicationData ,
    updateHistoryAndHiredCnt
} = require('../services/application.services');
const candidateProfileModel = require('../models/profiles/candidateProfile.model');

const updateApplication = async (req, res) => {
  try {
    const { jobId, applicantId } = req.params;
    const { status } = req.body;
    
    const isValid = await verifyApplicationData(jobId);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid application data" });
    }

    const updatedApplication = await applicationModel.findOneAndUpdate(
      { candidateId: applicantId, jobId },
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    await updateHistoryAndHiredCnt(jobId, status);

    return res.status(200).json(updatedApplication);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};


const getApplicantDetails = async (req, res) => {
    try {
        //fetch candidate profile details
        const candidateDetails = await candidateProfileModel.findOne({
            userId: req.params.applicantId  
        });

        if (!candidateDetails) {
            return res.status(404).json({ error: "Candidate not found" });
        }

        return res.status(200).json(candidateDetails);
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

const listOfApplicants = async (req, res) => {
    try {
        const application = await applicationModel
            .findOne({
                jobId: req.params.jobId
            })
            // .populate({
            //     path: 'candidateId',
            //     select: 'email',
            //     populate: {
            //         path: 'candidateProfile',
            //         select: 'name resume skills experience'
            //     }
            // });
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }
        return res.status(200).json(application);
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    updateApplication,
    getApplicantDetails,
    listOfApplicants,
};

