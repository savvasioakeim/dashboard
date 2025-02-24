const User = require("../models/User");

const updateEmailController = async (req, res) => {
    try {
        const { newEmail } = req.body;

        if (!newEmail || !newEmail.includes("@")) {
            return res.status(400).json({ message: "Please enter a valid email address." });
        }

        const existingUser = await User.findOne({ email: newEmail });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already in use." });
        }

        const user = await User.findById(req.session.user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.email = newEmail.trim().toLowerCase();
        await user.save();

        return res.status(200).json({ success: true, message: "Email updated successfully.", email: user.email });

    } catch (error) {
        console.error("Error updating email:", error);
        return res.status(500).json({ message: "Server error while updating email." });
    }
};

module.exports = updateEmailController;
