const user = require('../models/auth/auth.model');

const verifyPassword= async (data) => {
    try {
        const currUser = await user.findOne({ email: data.email });

        if (!currUser) {
            return false;
        }

        //encrypt the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        if(hashedPassword === currUser.password){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = verifyPassword;