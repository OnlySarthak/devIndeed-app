const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companyProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: ["service", "product", "startup", "enterprise"],
      required: true
    },

    // admin-controlled
    isVerified: {
      type: Boolean,
      default: false,
      select: false
    },

    logoUrl: {
      type: String
    },

    description: {
      type: String,
      minlength: 20
    },

    location: {
      type: [String],
      required: true,
      validate: v => v.length > 0
    },

    website: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    // system-managed
    noOfRecruitedCandidates: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("companyProfile", companyProfileSchema);
