const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const router = express.Router();
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


router.post('/upload-avatar/:id', upload.single('avatar'), async (req, res) => {
    try {
        const userId = req.params.id;
        const imagePath = `/uploads/${req.file.filename}`;


        const user = await User.findByIdAndUpdate(userId, { avatar: imagePath }, { new: true });


        res.json({ avatar: imagePath });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error uploading avatar", error });
    }
});

module.exports = router;
