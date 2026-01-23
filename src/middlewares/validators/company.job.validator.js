const mongoose = require("mongoose");

const validateCreateJob = (req, res, next) => {
  const {
    jobId,
    currentVacancy,
    totalVacancy,
    requirements,
    title,
    description,
    location,
    salary,
    companyId
  } = req.body;

  const errors = [];

  // ---- REQUIRED STRING FIELDS ----
  if (!jobId || typeof jobId !== "string") {
    errors.push("jobId is required and must be a string");
  }

  if (!requirements || typeof requirements !== "string") {
    errors.push("requirements is required and must be a string");
  }

  if (!title || typeof title !== "string") {
    errors.push("title is required and must be a string");
  }

  if (!description || typeof description !== "string") {
    errors.push("description is required and must be a string");
  }

  if (!location || typeof location !== "string") {
    errors.push("location is required and must be a string");
  }

  // ---- NUMBERS ----
  if (totalVacancy === undefined || typeof totalVacancy !== "number" || totalVacancy < 0 || totalVacancy > 200) {
    errors.push("totalVacancy must be a number between 0 and 200");
  }

  if (currentVacancy === undefined || typeof currentVacancy !== "number" || currentVacancy < 0) {
    errors.push("currentVacancy must be a non-negative number");
  }

  if (
    typeof currentVacancy === "number" &&
    typeof totalVacancy === "number" &&
    currentVacancy > totalVacancy
  ) {
    errors.push("currentVacancy cannot be greater than totalVacancy");
  }

  if (salary === undefined || typeof salary !== "number" || salary < 0) {
    errors.push("salary must be a non-negative number");
  }

  // ---- OBJECT ID ----
  if (!companyId || !mongoose.Types.ObjectId.isValid(companyId)) {
    errors.push("Valid companyId is required");
  }

  // ---- FAIL FAST ----
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Job validation failed",
      errors
    });
  }

  next();
};

const validateUpdateJob = (req, res, next) => {
  const {
    currentVacancy,
    totalVacancy,
    requirements,
    title,
    description,
    location,
    salary,
    isHistory
  } = req.body;

  const errors = [];

  // ---- IMMUTABLE FIELDS ----
  if (req.body.jobId) {
    errors.push("jobId cannot be updated");
  }

  if (req.body.companyId) {
    errors.push("companyId cannot be updated");
  }

  // ---- STRINGS (only if present) ----
  if (requirements !== undefined && typeof requirements !== "string") {
    errors.push("requirements must be a string");
  }

  if (title !== undefined && typeof title !== "string") {
    errors.push("title must be a string");
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("description must be a string");
  }

  if (location !== undefined && typeof location !== "string") {
    errors.push("location must be a string");
  }

  // ---- NUMBERS ----
  if (salary !== undefined && (typeof salary !== "number" || salary < 0)) {
    errors.push("salary must be a non-negative number");
  }

  if (
    totalVacancy !== undefined &&
    (typeof totalVacancy !== "number" ||
      totalVacancy < 0 ||
      totalVacancy > 200)
  ) {
    errors.push("totalVacancy must be between 0 and 200");
  }

  if (
    currentVacancy !== undefined &&
    (typeof currentVacancy !== "number" || currentVacancy < 0)
  ) {
    errors.push("currentVacancy must be a non-negative number");
  }

  if (
    typeof currentVacancy === "number" &&
    typeof totalVacancy === "number" &&
    currentVacancy > totalVacancy
  ) {
    errors.push("currentVacancy cannot exceed totalVacancy");
  }

  if (isHistory !== undefined && typeof isHistory !== "boolean") {
    errors.push("isHistory must be boolean");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Update validation failed",
      errors
    });
  }

  next();
};

module.exports = {
    validateCreateJob,
    validateUpdateJob
};