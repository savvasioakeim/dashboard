
import React, { useEffect, useState } from "react";




export default function CreateUser() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("user");

    function handleEmailChanges(e) {
        setEmail(e.target.value);
    }
    function handleNameChanges(e) {
        setName(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function handleConfirmPasswordChange(e) {
        setConfirmPassword(e.target.value);
    }
    function handleRoleChange(e) {
        setRole(e.target.value);
    }
    async function handleCreateUser() {
        if (!name || !email || !password || !confirmPassword || !role) {
            alert("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                role: role,
                confirmPassword: confirmPassword,
            }),
            credentials: "include",
        });
        const data = await response.json();

        if (response.ok) {
            alert(data.message);

        } else {
            alert(data.message);
        }
    }

    return (
        <>
            <div className='w-full h-screen bg-slate-200 rounded flex justify-center  items-center '>
                <form className='bg-white border p-4 sm:p-10 rounded'>
                    <h1 className="text-2xl  mb-2">Create a new User</h1>

                    <div className="flex flex-col ">


                        <div className="flex  gap-2 items-end justify-between sm:justify-start text-xs md:text-base md:mb-3 ">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="changeName">Name  </label>
                                <input value={name} onChange={handleNameChanges} type="text" className="form-input-text text-xs sm:text-base w-full p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300 " name="changeName" />
                            </div>
                        </div>
                        <div className="flex  gap-2 items-end justify-between sm:justify-around text-xs md:text-base md:mb-3">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="ChangeEmail">Email </label>
                                <input value={email} onChange={handleEmailChanges} type="text" className="form-input-text text-xs sm:text-base w-full p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300 " name="changeEmail" />
                            </div>
                        </div>
                        <div className="flex  gap-2 items-end justify-between sm:justify-start text-xs md:text-base md:mb-3">
                            <div className="flex flex-col gap-2">
                                <h1 className="">Role</h1>
                                <div className="  gap-2 flex  ">
                                    <label htmlFor="admin">Admin </label>
                                    <input
                                        id="admin"
                                        type="radio"
                                        name="role"
                                        value="admin"
                                        checked={role === "admin"}
                                        onChange={handleRoleChange}
                                        className="form-input-radius accent-purple-500"
                                    />
                                    <label htmlFor="user">User </label>
                                    <input
                                        id="user"
                                        type="radio"
                                        name="role"
                                        value="user"
                                        checked={role === "user"}
                                        onChange={handleRoleChange}
                                        className="form-input-radius accent-purple-500"
                                    />
                                </div>
                            </div>

                        </div>

                    </div>




                    <div className="flex  gap-2 items-end justify-between sm:justify-around text-xs md:text-base ">


                    </div>
                    <div className="flex  gap-2 items-end justify-between sm:justify-start text-xs md:text-base md:mb-3 ">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <input onChange={handlePasswordChange} value={password} type="password" className="form-input-text form-input-password text-xs sm:text-base w-full  p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300 " name="password" />
                        </div>

                    </div>
                    <div className="flex  gap-2 items-end justify-between sm:justify-start text-xs md:text-base md:mb-3">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="ConfirmNewPassword">Confirm Password</label>
                            <input onChange={handleConfirmPasswordChange} value={confirmPassword} type="password" className="form-input-text form-input-password text-xs sm:text-base w-full  p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" name="ConfirmNewPassword" />
                        </div>

                    </div>
                    <div className="text-center m-2">
                        <button onClick={handleCreateUser} className="border rounded p-2 bg-green-600 text-white hover:bg-green-700 cursor-pointer" type="button">Create User</button>
                    </div>
                </form>
            </div>

        </>
    )

}
