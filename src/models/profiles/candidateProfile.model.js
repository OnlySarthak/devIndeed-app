const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateProfileSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    photo : {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['candidate', 'company', 'admin'],
        default: 'candidate'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resume: {
        type: String,
        required: false
    },
    skills: {
        type: [String],
        required: false
    },
    experience: {
        type: Number,
        required: false
    },
    education: {
        type: String,
        required: false
    },
    appliedJobs: [{
        type: Schema.Types.ObjectId,
        ref: 'job'
    }],
    location: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('candidateProfile', candidateProfileSchema);