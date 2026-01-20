const validateRegistrationData = (data) => {
    const errors = [];
    if(data.email === undefined || !/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.push('Invalid or missing email');
    }else if(data.password === undefined || data.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }else if(data.role && !['candidate', 'company', 'admin'].includes(data.role)) {
        errors.push('Invalid role specified');
    }
    return errors;
};

const validateLoginData = (data) => {
    const errors = [];
    if(data.email === undefined || !/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.push('Invalid or missing email');
    }else if(data.password === undefined || data.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }
    return errors;
};

const validateForgetPasswordData = (data) => {
    const errors = [];
    if(data.email === undefined || !/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.push('Invalid or missing email');
    }
    return errors;
};

module.exports = {
    validateRegistrationData,
    validateLoginData
};