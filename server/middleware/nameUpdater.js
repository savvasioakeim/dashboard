const User = require("../models/User");

const updateNameController = async (req, res) => {
    try {
        const { newName } = req.body;

        if (!newName || newName.trim().length < 3) {
            return res.status(400).json({ message: "Name must be at least 3 characters long." });
        }

        const user = await User.findById(req.session.user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.name = newName.trim();
        await user.save();

        return res.status(200).json({ success: true, message: "Name updated successfully.", name: user.name });

    } catch (error) {
        console.error("Error updating name:", error);
        return res.status(500).json({ message: "Server error while updating name." });
    }
};

module.exports = updateNameController;
