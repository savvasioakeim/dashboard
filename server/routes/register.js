const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();
const session = require('express-session');
router.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));


router.post('/', async (req, res) => {
    try {
        const { name, email, password, confirmPassword, role } = req.body;
        const userRole = role || "user";

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords Do not Match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        const hash = await bcrypt.hash(password, 12);
        const user = new User({ name, email, password: hash, role: userRole });

        await user.save();
        req.session.user_id = user._id;
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router; 
