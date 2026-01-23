const Job = require('../models/jobs/job.model');

const createJob = (req, res) => {
    try {
        const { title, description, requirements, salary, location, totalVacancy } = req.body;

        //deside job is history or not
        const isHistory = totalVacancy === 0 ? true : false;

        //create new job
        const newJob = new Job({
            title,
            description,
            requirements,
            salary,
            location,
            totalVacancy,
            isHistory,
            companyId: req.user.id
        }).save();

        res.status(201).json({ message: "Job created successfully", job: newJob });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ 
            isHistory: false,
            companyId: req.user.id
         });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllHistoryJobs = async (req, res) => {
    try {
        const historyJobs = await Job.find({ isHistory: true,
            companyId: req.user.id
         });
        res.status(200).json(historyJobs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);  
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.status(200).json({ message: "Job updated successfully", job: updatedJob });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }  
}

module.exports = {
    createJob,
    getAllJobs,
    getAllHistoryJobs,
    getJobById,
    updateJob,
    deleteJob
};
