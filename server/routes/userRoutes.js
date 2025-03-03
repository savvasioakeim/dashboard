const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const router = express.Router();
const fs = require("fs");
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

router.delete("/remove-avatar/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });


        if (user.avatar) {
            const avatarPath = path.join(__dirname, "../uploads", path.basename(user.avatar));

            fs.unlink(avatarPath, (err) => {
                if (err) {
                    console.error("Error deleting avatar file:", err);
                    return res.status(500).json({ success: false, message: "Failed to delete avatar file" });
                }
            });
        }


        user.avatar = null;
        await user.save();

        res.json({ success: true, message: "Avatar removed successfully" });
    } catch (error) {
        console.error("Error removing avatar:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


module.exports = router;
