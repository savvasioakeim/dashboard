const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {

    if (req.session.user_id) {
        try {
            const user = await User.findById(req.session.user_id);
            if (user) {


                res.json({ authenticated: true, user });


            } else {


                res.status(404).json({ message: "User not found" });


            }
        } catch (err) {

            res.status(500).json({ message: "Internal server error" });
        }
    } else {


        res.json({ authenticated: false });
    }
});

module.exports = router;
