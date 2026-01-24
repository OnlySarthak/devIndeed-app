const jobModel = require('../models/jobs/job.model');
const applicationModel = require('../models/applications/application.model');
const companyProfileModel = require('../models/profiles/companyProfile.model');

const verifyApplicationData = async (jobId) => {
  try {
    const job = await jobModel.findOne({
      _id: jobId,
      isHistory: false,
      currentVacancy: { $gt: 0 }
    });
    
    console.log(job);

    return !!job; // true if found, false if not
  } catch (err) {
    console.error("Error verifying job data:", err);
    return false;
  }
};


const verifyExistingApplication = (candidateId, jobId) => {
    //verify existing application
    applicationModel.findOne({
        candidateId,
        jobId
    }).then((application) => {
        if (application) {
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
        if (status === 'accepted') {
            //update model to set isHistory to true
            const job = await jobModel.findOneAndUpdate(
                { _id: jobId },
                { isHistory: true },
                { new: true });

            //update hired count
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