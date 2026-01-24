const jobModel = require('../models/jobs/job.model');
const applicationModel = require('../models/applications/application.model');
const { verifyApplicationData, verifyExistingApplication } = require('../services/application.services');

//controllers for candidates to view and apply for jobs can be added here
const listAvailableJobs = async (req, res) => {
    try {
        const jobs = await jobModel.find({ isHistory: false })
        .populate('companyId', 'name')
        .exec();

        console.log(jobs);
        res.status(200).json(jobs);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const viewJobDetails = async (req, res) => {
    try {
        const job = await jobModel.findById(req.params.jobId)
        .populate('companyId', 'name logoUrl verified')
        .exec();
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const applyToJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const candidateId = req.user.id;
        
        const isJobValid = await verifyApplicationData(jobId);
        if (!isJobValid) {
            return res.status(400).json({ error: "Invalid job application data" });
        }
        console.log("hello");
        
        const exists = await verifyExistingApplication(candidateId, jobId);
        if (exists) {
            return res.status(400).json({ error: "You have already applied for this job" });
        }
        
        //create new application
        const newApplication = new applicationModel({
            candidateId,
            jobId
        });

        await newApplication.save();
        res.status(201).json({ message: "Application submitted successfully", application: newApplication });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    listAvailableJobs,
    viewJobDetails,
    applyToJob
}

