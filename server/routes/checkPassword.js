const User = require('../models/User');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();



router.post('/', async (req, res) => {
    const { password } = req.body;


    try {
        const user = await User.findById(req.session.user_id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isCorrect = await bcrypt.compare(password, user.password);
        if (isCorrect) {
            return res.json({ isCorrect: true });
        } else {
            return res.json({ isCorrect: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;