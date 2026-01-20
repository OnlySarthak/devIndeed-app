const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
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
}, { timestamps: true });

module.exports = mongoose.model('candidateProfile', candidateProfileSchema);