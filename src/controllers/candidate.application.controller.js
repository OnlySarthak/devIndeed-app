const applicationModel = require('../models/applications/application.model');

const listOfApplicationsforCandidate = async (req, res) => {
    try {
        const applications = await applicationModel
            .find({ candidateId: req.user.id })
            .populate('jobId', 'title company location');   
        return res.status(200).json(applications);
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

const deleteApplication = async (req, res) => {
    try {
        const application = await applicationModel.findOneAndDelete({
            candidateId: req.user.id,
            jobId: req.params.jobId
        });
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }
        return res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    listOfApplicationsforCandidate,
    deleteApplication
};
