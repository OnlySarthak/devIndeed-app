const user = require('../models/auth/auth.model');
const bcrypt = require('bcrypt');
const {
  validateLoginData,
  validateRegistrationData
} = require('../utils/validators/authdata.validator.js');

const login = async (req, res) => {
  try {
    // Validate the login data
    validateLoginData(req.body);

    // Find the user by email
    const currUser = await user
      .findOne({ email: req.body.email })
      .select('+password');

    if (!currUser) {
      return res.status(401).send("Invalid credentials");
    }

    // Verify password
    const isValid = await bcrypt.compare(
      req.body.password,
      currUser.password
    );

    if (!isValid) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate token and login
    const token = await currUser.generateAuthToken();

    res.cookie('token', token);
    res.status(200).json({
      message: "Login successful",
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);

    // Check if user already exists
    const existingUser = await user.find({ email: req.body.email });

    if (existingUser.length > 0) {
      return res.status(400).send("User already exists with this email");
    }

    // Validate user data
    validateRegistrationData(req.body);

    // Encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new user({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    // Auto-login after register
    const token = await newUser.generateAuthToken();

    res.cookie('token', token);
    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    path: '/',
  });

  res.json({ message: 'Logout successful' });
};

module.exports = {
  login,
  register,
  logout
};
