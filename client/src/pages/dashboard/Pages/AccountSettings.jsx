import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";






export default function AccountSettings() {


    const { user: initialUser, authenticated } = useOutletContext();
    const [user, setUser] = useState(initialUser);
    const [selectedFile, setSelectedFile] = useState(null);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");




    function handleEmailChanges(e) {
        setEmail(e.target.value);
    }
    function handleNameChanges(e) {
        setName(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleNewPasswordChange(e) {
        setNewPassword(e.target.value);
    }

    function handleConfirmPasswordChange(e) {
        setConfirmPassword(e.target.value);
    }



    const checkPassword = async () => {
        if (!password) {
            alert("Please enter your current password.");
            return;
        }

        try {

            const response = await axios.post(
                `http://localhost:3000/api/check-password`,
                { password },
                { withCredentials: true }
            );

            if (response.data.isCorrect) {

                if (newPassword !== confirmPassword) {
                    alert("New passwords do not match.");
                    return;
                }


                const updateResponse = await axios.post(
                    `http://localhost:3000/api/update-password`,
                    { currentPassword: password, newPassword },
                    { withCredentials: true }
                );

                if (updateResponse.data.success === true) {
                    alert("Password updated successfully!");

                    setPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                } else {
                    alert("Failed to update password.");
                }
            } else {
                alert("Incorrect password!");
            }
        } catch (error) {
            console.error("Error in password update request:", error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred. Please try again.");
            }
        }
    };



    const handleUpdateName = async () => {
        if (!name || name.trim().length < 3) {
            alert("Name must be at least 3 characters long.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:3000/api/update-name`,
                { newName: name },
                { withCredentials: true }
            );

            alert(response.data.message);

            if (response.data.success) {
                setUser((prevUser) => ({ ...prevUser, name: response.data.name }));
                setName("");
            }
        } catch (error) {
            console.error("Error updating name:", error);
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    const handleUpdateEmail = async () => {
        if (!email || !email.includes("@") || email.trim().length < 5) {
            alert("Please enter a valid email.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:3000/api/update-email`,
                { newEmail: email },
                { withCredentials: true }
            );

            alert(response.data.message);

            if (response.data.success) {
                setUser((prevUser) => ({ ...prevUser, email: response.data.email }));
                setEmail("");
            }
        } catch (error) {
            console.error("Error updating email:", error);
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };






    if (!authenticated) {
        return <div>You are not authenticated!</div>;
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);

        }

    };


    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", selectedFile);

        try {
            const response = await axios.post(
                `http://localhost:3000/api/users/upload-avatar/${user._id}`,
                formData,
                { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
            );

            const newAvatarUrl = response.data.avatar;

            setUser((prevUser) => ({
                ...prevUser,
                avatar: newAvatarUrl,
            }));

        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload avatar.");
        }
    };
    const obfuscateEmail = (email) => {
        const [localPart, domain] = email.split('@');
        const visiblePart = localPart.slice(0, 2);
        const hiddenPart = '*'.repeat(localPart.length - 2);
        return `${visiblePart}${hiddenPart}@${domain}`;
    };



    const handleRemoveAvatar = async () => {

        try {
            const response = await axios.delete(
                `http://localhost:3000/api/users/remove-avatar/${user._id}`,
                { withCredentials: true }
            );

            if (response.data.success) {
                setUser((prevUser) => ({ ...prevUser, avatar: null }));
                setSelectedFile(null)

                const fileInput = document.getElementById("file-upload");
                if (fileInput) {
                    fileInput.value = "";
                }
                alert("Avatar removed successfully.");
            } else {
                alert("Failed to remove avatar.");
            }

        } catch (error) {
            console.error("Error removing avatar:", error);
            alert("An error occurred. Please try again.");
        }



    };

    const formattedEmail = obfuscateEmail(user.email);
    return (
        <>
            <div className="w-full h-screen bg-slate-200   flex  justify-center  items-center  ">
                <div className="border w-fit md:w-2xl bg-white   flex flex-col rounded p-3 py-5 md:p-14 ">
                    <div className="flex flex-col gap-2 ">
                        <div className="flex  items-center gap-2 justify-around  ">
                            <div className="flex flex-col">



                                {user.avatar ? (
                                    <img
                                        src={`http://localhost:3000${user.avatar}`}
                                        alt="User Avatar"
                                        className="text-5xl w-20 h-20 md:w-40 md:h-40 rounded-full border border-black object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="rounded-full border bg-white text-black w-20 h-20 md:w-40 md:h-40" />
                                )}


                                <div className="flex w-full flex-col items-center justify-around">
                                    <div className="relative ">
                                        <input
                                            type="file"
                                            id="file-upload"
                                            onChange={handleFileChange}
                                            className="hidden inset-0 opacity-0 cursor-pointer "
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="block text-xs md:text-base  text-center bg-blue-500 cursor-pointer text-white p-2 rounded pl-4 pr-4  md:pl-5    md:pr-5  hover:bg-blue-600 mt-2  "
                                        >
                                            Upload File
                                        </label>
                                    </div>
                                </div>

                            </div>

                            <div className="flex flex-col items-center">
                                {selectedFile ? (
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Preview Avatar"
                                        className="text-5xl w-20 h-20 md:w-40 md:h-40 rounded-full border border-black object-cover"
                                    />
                                ) : user.avatar ? (
                                    <img
                                        src={`http://localhost:3000${user.avatar}`}
                                        alt="User Avatar"
                                        className="text-5xl w-20 h-20 md:w-40 md:h-40 rounded-full border border-black object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="rounded-full border bg-white text-black w-20 h-20 md:w-40 md:h-40" />
                                )}
                                <div>
                                    <button
                                        disabled={!selectedFile}
                                        type="button"
                                        onClick={handleUpload}
                                        className={`outline rounded p-2 mt-2 text-xs md:text-base ${selectedFile ? "bg-green-600 hover:bg-green-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
                                            } text-white`}
                                    >
                                        Change Avatar
                                    </button>
                                </div>

                            </div>
                            <div className="flex flex-col items-center">

                                <FaUserCircle className="rounded-full border bg-white text-black w-20 h-20 md:w-40 md:h-40" />

                                <div>
                                    <button
                                        disabled={!user.avatar}
                                        type="button"
                                        onClick={handleRemoveAvatar}
                                        className={`outline rounded p-2 mt-2 text-xs md:text-base ${user.avatar ? "bg-red-600 hover:bg-red-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
                                            } text-white`}
                                    >
                                        Remove Avatar
                                    </button>
                                </div>

                            </div>




                        </div>
                        <hr className="mt-4 mb-4 border-gray-400" />

                        <div className="flex  gap-2 items-end justify-between sm:justify-around text-xs md:text-base ">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="changeName">Change Name <span className="text-gray-400 ">{`(${user.name.charAt(0).toUpperCase() + user.name.slice(1)})`}</span> </label>
                                <input value={name} onChange={handleNameChanges} type="text" className="form-input-text text-xs sm:text-base w-full p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300 " name="changeName" />
                            </div>
                            <button onClick={handleUpdateName} type="button" className="outline rounded bg-slate-700 text-white p-2 hover:bg-slate-900 cursor-pointer ">Save</button>
                        </div>
                        <hr className="mt-4 mb-4 border-gray-400" />

                        <div className="flex  gap-2 items-end justify-between sm:justify-around text-xs md:text-base">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="ChangeEmail">Change email <span className="text-gray-400 ">{`(${formattedEmail})`}</span> </label>
                                <input value={email} onChange={handleEmailChanges} type="text" className="form-input-text text-xs sm:text-base w-full p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300 " name="changeEmail" />
                            </div>
                            <button onClick={handleUpdateEmail} type="button" className="outline rounded bg-slate-700 text-white p-2 hover:bg-slate-900 cursor-pointer ">Save</button>
                        </div>
                        <hr className="mt-4 mb-4 border-gray-400" />
                        <div className="flex  justify-between sm:justify-around items-end  text-xs md:text-base">
                            <div className="flex flex-col gap-2 ">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="password">Password</label>
                                    <input onChange={handlePasswordChange} value={password} type="password" className="form-input-text form-input-password text-xs sm:text-base w-full  p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300 " name="password" />
                                </div>

                                <div className="flex flex-col gap-2 ">
                                    <label htmlFor="NewPassword">New Password</label>
                                    <input onChange={handleNewPasswordChange} value={newPassword} type="password" className="form-input-text form-input-password text-xs sm:text-base w-full p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" name="NewPassword" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="ConfirmNewPassword">Confirm Password</label>
                                    <input onChange={handleConfirmPasswordChange} value={confirmPassword} type="password" className="form-input-text form-input-password text-xs sm:text-base w-full  p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" name="ConfirmNewPassword" />
                                </div>

                            </div>
                            <div>
                                <button onClick={checkPassword} type="button" className="outline rounded bg-slate-700 text-white p-2 hover:bg-slate-900 cursor-pointer ">Save</button>
                            </div>


                        </div>


                    </div>







                </div>
            </div>

        </>
    )

}
