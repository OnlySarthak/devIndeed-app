// Job Model
const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  jobId: {
    type: String,
    required: true,
    unique: true
  },
  isHistory: {
    type: Boolean,
    default: false
  },
  currentVacancy : {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'companyProfile',
    required: true
  },
    postedDate: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('job', jobSchema);