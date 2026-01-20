const express = require('express');
const { validateLogin, validateRegistrationData } = require('../utils/validators/authdata.validator.js');
const authRouter = express.Router();
const user = require('../models/auth/auth.model');
const bcrypt = require('bcrypt');

authRouter.post('/login', async (req, res) => {
    try {
        // Validate the login data
        validateLogin(req.body);

        // Find the user by email
        const currUser = await user
            .findOne({ email: req.body.email })
            .select('+password');

        if (!currUser) {
            return res.status(401).send("Invalid credentials");
        }

        //verify password
        const isValid = await bcrypt.compare(
            req.body.password,
            currUser.password
        );

        if (!isValid) {
            return res.status(401).send("Invalid credentials");
        }
        else {      //then finaly login the user
            const token = await currUser.generateAuthToken(); // Generate a token for the user
            //send cookies back to the client 
            res.cookie('token', token);

            res.status(200).json({
                message: "Login successful",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

authRouter.post('/register', async (req, res) => {
    try {

        console.log(req.body);
        

        // check if user alsready exists
        const existingUser = await user.find({ email: req.body.email });
        
        if (existingUser.length > 0) {
            return res.status(400).send("User already exists with this email");
        }
        
        //validate the user data
        validateRegistrationData(req.body);
        
        //encrypt the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new user({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword, // Store the hashed password
        });
        
        await newUser.save(); // Save the user to the database
        
        //make user logged in 
        const token = await newUser.generateAuthToken(); // Generate a token for the user
        //send cookies back to the client
        res.cookie('token', token);

        res.status(201).json({
            message: "User registered successfully",
        });
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

authRouter.post('/logout', (req, res) => {
    res.clearCookie('token',
        {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/', // whatever was used originally
        }
    );
    res.json({ message: 'Logout successful' });
});

module.exports = authRouter;