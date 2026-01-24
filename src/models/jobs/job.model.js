// Job Model
const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  isHistory: {
    type: Boolean,
    default: false
  },
  currentVacancy : {
    type: Number,
    min: 0,
  },
  totalVacancy: {
    type: Number,
    required: true,
    min: 0,
    max : 200
  },
  requirements: {
    type: String,
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
    required: true,
    min: 0
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'companyProfile',
    required: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
},{ timestamps: true });

module.exports = mongoose.model('job', jobSchema);