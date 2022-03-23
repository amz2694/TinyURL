const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConfig');
const PORT = process.env.PORT || 8080;

require('dotenv').config();

connectDB();

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})