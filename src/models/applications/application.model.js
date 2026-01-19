// Application Model
const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
    candidateId: {
        type: Schema.Types.ObjectId,
        required: true, 
        ref: 'user',
        index: true
    },
    jobId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'job',
        index: true
    },
    status: {
        type: String,   
        enum: ['applied', 'under review', 'interview', 'offered', 'rejected'],
        default: 'applied'
    },  
    appliedDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
})

applicationSchema.index({ jobId: 1, status: 1 });


module.exports = mongoose.model('application', applicationSchema);


