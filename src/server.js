const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');


const app = express();

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));

app.use(express.json());
app.use(cookieParser());

const company = require('./routes/company.routes');
const candidate = require('./routes/candidate.routes');
// const defaultList = require('./routes/homepage.routes');
const auth = require('./routes/auth.routes');

app.use('/auth', auth);
app.use('/candidate', candidate);
app.use('/company', company);


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
});