const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyProfileSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['service', 'product', 'startup', 'enterprise'],
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    logoUrl: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    location : [{
        type: String,
        required: false    
    }],
    website: {
        type: String,
        required: false
    },
    noOfRecruitedCandidates: {
        type: Number,
        default: 0
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

module.exports = mongoose.model('companyProfile', companyProfileSchema);