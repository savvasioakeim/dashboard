const bcrypt = require('bcrypt');
const User = require('../models/User');


const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;


    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Both current and new passwords are required." });
    }
    if (currentPassword === newPassword) {
        return res.status(400).json({ message: "New password cannot be the same with current password." });
    }

    try {

        const user = await User.findById(req.session.user_id);

        if (!user) {

            return res.status(404).json({ message: "User not found." });
        }


        const isCorrect = await bcrypt.compare(currentPassword, user.password);

        if (!isCorrect) {

            return res.status(400).json({ message: "Incorrect current password." });
        }


        if (newPassword.length < 6) {

            return res.status(400).json({ message: "New password must be at least 6 characters long." });
        }


        const hashedNewPassword = await bcrypt.hash(newPassword, 10);



        user.password = hashedNewPassword;
        await user.save();


        return res.status(200).json({ success: true, message: "Password updated successfully." });

    } catch (error) {

        return res.status(500).json({ message: "Server error while updating password." });
    }
};

module.exports = { updatePassword };
