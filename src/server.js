const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));

app.use(express.json());
app.use(cookieParser());

const company = require('./routes/company.routes');
const candidate = require('./routes/candidate.routes');
const defaultList = require('./routes/homepage.routes');

app.use('/', defaultList);
app.use('/company', company);
app.use('/candidate', candidate);