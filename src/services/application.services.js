const jobModel = require('../models/jobs/job.model');

const verifyApplicationData = (currCandidateId, companyId) => {

    //verify job data
    jobModel.findOne({
        companyId: companyId,
        isHistory: false,
        currentVacancy: { $gt: 0 }
        }).then((job) => {
            if(job) {
                return true;
            }
            return false;
        }).catch((err) => {
            console.error('Error verifying job data:', err);
            return false;
        });
};

const verifyExistingApplication = (applicantId, jobId) => {
    //verify existing application
    applicationModel.findOne({
        applicantId: applicantId,
        jobId: jobId
        }).then((application) => {
            if(application) {
                return true;
            }
            return false;
        }
    ).catch((err) => {
        console.error('Error verifying existing application:', err);
        return false;
    });
};

module.exports = {
    verifyApplicationData,
    verifyExistingApplication
}