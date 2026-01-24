const validateCreateCompanyProfile = (req, res, next) => {
  try {
    const {
      name,
      logoUrl,
      type,
      description,
      website,
      location,
      phone,
      noOfRecruitedCandidates
    } = req.body;

    const data = req.body;

    const errors = [];
    console.log("here");
    

    if (!data || Object.keys(data).length === 0) {
      errors.push("Profile data is required");
    }

    // required fields
    if (!name || typeof name !== 'string') {
      errors.push("Name is required and must be a string");
    }

    if (!type || !['service', 'product', 'startup', 'enterprise'].includes(type)) {
      errors.push("Company type must be service, product, startup, or enterprise");
    }

    // optional fields
    if (logoUrl && typeof logoUrl !== 'string') {
      errors.push("Logo URL must be a string");
    }

    if (description && typeof description !== 'string') {
      errors.push("Description must be a string");
    }

    if (website && !/^https?:\/\/.+\..+/.test(website)) {
      errors.push("Invalid website URL");
    }

    if (location && !Array.isArray(location)) {
      errors.push("Location must be an array of strings");
    }

    if (
      location &&
      location.some(loc => typeof loc !== 'string')
    ) {
      errors.push("Each location must be a string");
    }

    if (phone && !/^\+?[0-9]{7,15}$/.test(phone)) {
      errors.push("Invalid phone number format");
    }

    if (
      noOfRecruitedCandidates &&
      typeof noOfRecruitedCandidates !== 'number'
    ) {
      errors.push("Number of recruited candidates must be a number");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const VALID_TYPES = ["service", "product", "startup", "enterprise"];

const validateUpdateCompanyProfile = (req, res, next) => {
  const {
    name,
    type,
    logoUrl,
    description,
    location,
    website,
    phone,
    noOfRecruitedCandidates,
    isVerified
  } = req.body;

  const errors = [];

  // ---- IMMUTABLE ----
  if (req.body.userId) {
    errors.push("userId cannot be updated");
  }

  // ---- STRINGS ----
  if (name !== undefined && typeof name !== "string") {
    errors.push("name must be a string");
  }

  if (type !== undefined && !VALID_TYPES.includes(type)) {
    errors.push(`type must be one of: ${VALID_TYPES.join(", ")}`);
  }

  if (logoUrl !== undefined && typeof logoUrl !== "string") {
    errors.push("logoUrl must be a string");
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("description must be a string");
  }

  if (website !== undefined && typeof website !== "string") {
    errors.push("website must be a string");
  }

  // ---- LOCATION ----
  if (location !== undefined) {
    if (!Array.isArray(location)) {
      errors.push("location must be array of strings");
    } else {
      location.forEach((loc, idx) => {
        if (typeof loc !== "string") {
          errors.push(`location[${idx}] must be string`);
        }
      });
    }
  }

  // ---- PHONE ----
  if (phone !== undefined) {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      errors.push("phone must be valid 10 digit Indian number");
    }
  }

  // ---- COUNTERS ----
  if (
    noOfRecruitedCandidates !== undefined &&
    (typeof noOfRecruitedCandidates !== "number" ||
      noOfRecruitedCandidates < 0)
  ) {
    errors.push("noOfRecruitedCandidates must be non-negative number");
  }

  if (isVerified !== undefined && typeof isVerified !== "boolean") {
    errors.push("isVerified must be boolean");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Company profile update validation failed",
      errors
    });
  }

  next();
};


module.exports = {
  validateCreateCompanyProfile,
  validateUpdateCompanyProfile
};