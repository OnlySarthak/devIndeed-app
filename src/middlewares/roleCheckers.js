const isCompany = (req, res, next) => {
    if (req.user.role !== 'company') {
        return res.status(403).json({ error: 'Access denied. Company role required.' });
    }
    next();
}

const isCandidate = (req, res, next) => {
    if (req.user.role !== 'candidate') {
        return res.status(403).json({ error: 'Access denied. Candidate role required.' });
    }
    next();
}

module.exports = {
    isCompany,
    isCandidate
};