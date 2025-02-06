const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const app = express();
const port = 3000;

const adminRouter = require('./routes/admin')


// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Dashboard')
    .then(() => {
        console.log("Mongo connection open");
    })
    .catch((err) => {
        console.log("Oh no error", err);
    });

app.use(cors());

app.use('/dashboard', adminRouter)

// Serve static files from the React build folder
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// Fallback route for client-side rendering
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
