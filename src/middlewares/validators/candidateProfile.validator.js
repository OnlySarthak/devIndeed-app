const validateCreateCandidateProfile = (req, res, next) => {
  try {
    const { name,
      photo,
      resume,
      skills,
      experience,
      education,
      location,
      phone,
      appliedJobs
    } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Profile data is required");
    }

    // required fields
    if (!name || typeof name !== 'string') {
      throw new Error("Name is required and must be a string");
    }

    // optional but validated fields
    if (photo && typeof photo !== 'string') {
      throw new Error("Photo must be a string URL");
    }

    if (resume && typeof resume !== 'string') {
      throw new Error("Resume must be a string URL");
    }

    if (skills && !Array.isArray(skills)) {
      throw new Error("Skills must be an array of strings");
    }

    if (skills && skills.some(skill => typeof skill !== 'string')) {
      throw new Error("Each skill must be a string");
    }

    if (experience && typeof experience !== 'number') {
      throw new Error("Experience must be a number");
    }

    if (education && typeof education !== 'string') {
      throw new Error("Education must be a string");
    }

    if (location && typeof location !== 'string') {
      throw new Error("Location must be a string");
    }

    
    if (phone && !/^\+?[0-9]{7,15}$/.test(phone)) {
      throw new Error("Invalid phone number format");
    }
    
    if (appliedJobs && !Array.isArray(appliedJobs)) {
      throw new Error("Applied jobs must be an array");
    }
    
    if (appliedJobs && appliedJobs.some(jobId => typeof jobId !== 'string')) {
      throw new Error("Each applied job ID must be a string");
    }
    
    
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    next();
  } catch (error) {
    throw new Error(`Profile validation error: ${error.message}`);
  }
};

const validateUpdateCandidateProfile = (req, res, next) => {
  try {
    const { name,
      photo,
      resume,
      skills,
      experience,
      education,
      location,
      phone,
      appliedJobs
    } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("At least one field is required to update the profile");
    }
    const errors = [];

    // optional but validated fields
    if (name && typeof name !== 'string') {
      errors.push("Name must be a string");
    }

    if (photo && typeof photo !== 'string') {
      errors.push("Photo must be a string URL");
    }

    if (resume && typeof resume !== 'string') {
      errors.push("Resume must be a string URL");
    }

    if (skills && !Array.isArray(skills)) {
      errors.push("Skills must be an array of strings");
    }

    if (skills && skills.some(skill => typeof skill !== 'string')) {
      errors.push("Each skill must be a string");
    }

    if (experience && typeof experience !== 'number') {
      errors.push("Experience must be a number");
    }

    if (education && typeof education !== 'string') {
      errors.push("Education must be a string");
    }

    if (location && typeof location !== 'string') {
      errors.push("Location must be a string");
    }

    if (phone && !/^\+?[0-9]{7,15}$/.test(phone)) {
      errors.push("Invalid phone number format");
    }

    if (appliedJobs && !Array.isArray(appliedJobs)) {
      errors.push("Applied jobs must be an array");
    }

    if (appliedJobs && appliedJobs.some(jobId => typeof jobId !== 'string')) {
      errors.push("Each applied job ID must be a string");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    next();
  } catch (error) {
    throw new Error(`Profile update validation error: ${error.message}`);
  }
};

module.exports = {
  validateCreateCandidateProfile,
  validateUpdateCandidateProfile
};