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

const updateHistoryAndHiredCnt = async (jobId, status) => {
    try {
        if(status === 'accepted'){
            //update model to set isHistory to true
            const job = await jobModel.findOneAndUpdate(
                { _id: jobId }, 
                { isHistory: true },
                { new: true });

            //update hired count
            const updatedprofile = await companyProfileModel.findOneAndUpdate(
                { userId: job.companyId },
                { $inc: { hiredCount: 1 } },
                { new: true });

            return null;
        }
        return null;
    } catch (err) {
        console.error('Error updating isHistory flag:', err);
        return null;
    }
};


module.exports = {
    verifyApplicationData,
    verifyExistingApplication,
    updateHistoryAndHiredCnt
}