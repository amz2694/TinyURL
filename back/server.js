const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT.js');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConfig');
const corsOptions = require('./config/corsOption');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
require('dotenv').config();

// connect to database
connectDB();

// cross origin resource sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth.js'));
app.use('/refresh', require('./routes/refresh'));

app.use('/short', require('./routes/api/shortner'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})