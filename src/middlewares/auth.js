const user = require('../models/auth/auth.model'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // verify the token
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // log(decoded)
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = auth;