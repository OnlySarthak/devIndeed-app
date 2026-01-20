// Candidate Authentication Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const user = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['candidate', 'company', 'admin'],
        default: 'candidate'
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

user.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign(
        {   
            id: this._id.toString(), 
            role: this.role 
        },
        process.env.JWT_SECRETE, 
        {
            expiresIn: '1d' // Token expiration time
        }
    );

    return token;
};

module.exports = mongoose.model('user', user);
