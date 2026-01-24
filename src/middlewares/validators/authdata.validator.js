const express = require('express');

const validateRegistrationData = (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        const errors = [];
        if(email === undefined || !/^\S+@\S+\.\S+$/.test(email)) {
            errors.push('Invalid or missing email');
        }else if(password === undefined || password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }else if(role && !['candidate', 'company', 'admin'].includes(role)) {
            errors.push('Invalid role specified');
        }
        
        if(errors.length > 0) {
            return res.status(400).json({ errors });
        }

        next();
        
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const validateLoginData = (req, res, next) => {
    try {
        const { email, password } = req.body;

        const errors = [];
        
        if(email === undefined || !/^\S+@\S+\.\S+$/.test(email)) {
            errors.push('Invalid or missing email');
        }else if(password === undefined || password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }
        
        if(errors.length > 0) {
            return res.status(400).json({ errors });
        }
        next();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


module.exports = {
    validateRegistrationData,
    validateLoginData,
};