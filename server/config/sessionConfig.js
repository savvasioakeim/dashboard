require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,  // MongoDB connection URI from your .env file
        collectionName: 'sessions',  // Optional: specify the collection name for sessions
    }),
    cookie: {
        secure: false,  // Set to true if using HTTPS
        httpOnly: true, // Prevents client-side access to cookies
        sameSite: 'lax'
    }
});

module.exports = sessionConfig;