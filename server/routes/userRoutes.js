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

router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, "-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id, "-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
router.put('/:id/role', (req, res) => {
    const { id } = req.params;
    const { role } = req.body;


    User.findByIdAndUpdate(id, { role }, { new: true })
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json({ error: err.message }));
});
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const { name, email, newId } = req.body;


        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== req.params.id) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        let updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });


        if (newId && newId !== req.params.id) {
            updatedUser = await User.findByIdAndDelete(req.params.id);
            const newUser = new User({
                _id: newId,
                name,
                email,
                role: updatedUser.role,
            });
            await newUser.save();
            return res.json(newUser);
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

module.exports = router;
