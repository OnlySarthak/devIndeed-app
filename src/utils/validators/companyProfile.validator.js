const validateCompanyProfile = (data) => {
  if (!data) {
    throw new Error("Company profile data is required");
  }

  // required fields
  if (!data.name || typeof data.name !== 'string') {
    throw new Error("Company name is required and must be a string");
  }

  if (!data.type || !['service', 'product', 'startup', 'enterprise'].includes(data.type)) {
    throw new Error("Company type must be service, product, startup, or enterprise");
  }

  // optional fields
  if (data.logoUrl && typeof data.logoUrl !== 'string') {
    throw new Error("Logo URL must be a string");
  }

  if (data.description && typeof data.description !== 'string') {
    throw new Error("Description must be a string");
  }

  if (data.website && !/^https?:\/\/.+\..+/.test(data.website)) {
    throw new Error("Invalid website URL");
  }

  if (data.location && !Array.isArray(data.location)) {
    throw new Error("Location must be an array of strings");
  }

  if (
    data.location &&
    data.location.some(loc => typeof loc !== 'string')
  ) {
    throw new Error("Each location must be a string");
  }

  if (data.phone && !/^\+?[0-9]{7,15}$/.test(data.phone)) {
    throw new Error("Invalid phone number format");
  }

  if (
    data.noOfRecruitedCandidates &&
    typeof data.noOfRecruitedCandidates !== 'number'
  ) {
    throw new Error("Number of recruited candidates must be a number");
  }

  return true;
};

module.exports = validateCompanyProfile;
