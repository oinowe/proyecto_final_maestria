/* Copyright (C) - All Rights Reserved
 * Name: API Node.js - Pipeline Azure & AWS
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Oscar O. Inowe <oscar.orozco@cetys.edu.mx>, November 2020
 */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

app.use(express.json());

// Import ROUTES
const studentRoutes = require('./routes/students');

app.use('/students', studentRoutes);

// Initializer
app.get('/', (req, res) => {
    res.send('API Proyecto Maestria Software Node.js');
});

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    {
        useNewUrlParser:  true,
        useUnifiedTopology: true,
    }, 
    () => console.log('Connected to mongoose...')
)


// PORT Definition
const port = process.env.port || 80;
app.listen(port, () => console.log(`Listening in port ${port}...`))