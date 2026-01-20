const validateCandidateProfile = (data) => {
  if (!data) {
    throw new Error("Profile data is required");
  }

  // required fields
  if (!data.name || typeof data.name !== 'string') {
    throw new Error("Name is required and must be a string");
  }

  // optional but validated fields
  if (data.photo && typeof data.photo !== 'string') {
    throw new Error("Photo must be a string URL");
  }

  if (data.resume && typeof data.resume !== 'string') {
    throw new Error("Resume must be a string URL");
  }

  if (data.skills && !Array.isArray(data.skills)) {
    throw new Error("Skills must be an array of strings");
  }

  if (data.skills && data.skills.some(skill => typeof skill !== 'string')) {
    throw new Error("Each skill must be a string");
  }

  if (data.experience && typeof data.experience !== 'number') {
    throw new Error("Experience must be a number");
  }

  if (data.education && typeof data.education !== 'string') {
    throw new Error("Education must be a string");
  }

  if (data.location && typeof data.location !== 'string') {
    throw new Error("Location must be a string");
  }

  if (data.phone && !/^\+?[0-9]{7,15}$/.test(data.phone)) {
    throw new Error("Invalid phone number format");
  }

  if (data.appliedJobs && !Array.isArray(data.appliedJobs)) {
    throw new Error("Applied jobs must be an array");
  }

  return true;
};

module.exports = validateCandidateProfile;
