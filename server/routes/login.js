const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const session = require('express-session');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            req.session.user_id = user._id;
            if (rememberMe) {

                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
            } else {

                req.session.cookie.maxAge = null;
            }
            return res.status(200).json({ message: "Login successful", user });
        } else {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router; 
