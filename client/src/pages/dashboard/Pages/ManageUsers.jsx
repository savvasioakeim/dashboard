
import React, { useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";



export default function ManageUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState("")
    const [editedUser, setEditedUser] = useState({ name: "", email: "", id: "" });
    const [validationErrors, setValidationErrors] = useState({});


    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:3000/api/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    const handleRoleChange = async (userId, newRole) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });

            if (!response.ok) throw new Error('Failed to update role');


            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, role: newRole } : user
                )
            );
        } catch (err) {
            setError(err.message);
        }

    };
    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) return;
        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete user');


            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } catch (err) {
            setError(err.message);
        }
    };
    const validateInputs = () => {
        let errors = {};

        if (!editedUser.name.trim()) {
            errors.name = "Name is required";
        }

        if (!editedUser.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(editedUser.email)) {
            errors.email = "Invalid email format";
        } else if (users.some(user => user.email === editedUser.email && user._id !== editedUser.id)) {
            errors.email = "This email is already in use";
        }

        if (!editedUser.id.trim()) {
            errors.id = "ID is required";
        } else if (users.some(user => user._id === editedUser.id && user._id !== editedUser.id)) {
            errors.id = "This ID is already in use";
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleEditMode = (user) => {
        setEditMode(user._id);
        setEditedUser({ name: user.name, email: user.email, id: user._id });
    };
    const handleInputChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };
    const handleSave = async (userId) => {
        if (!validateInputs()) return;
        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedUser),
            });

            if (!response.ok) throw new Error('Failed to update user');

            const updatedUser = await response.json();
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user._id === userId ? updatedUser : user))
            );

            setEditMode(null);
        } catch (err) {
            setError(err.message);
        }
    };



    return (
        <>

            <div className='w-full h-screen bg-slate-200 flex flex-col overflow-auto '>
                <div className='p-3 gap-2 flex h-fit border-b w-full '>
                    <div className='ml-10'>
                        <label htmlFor="search">Search</label>
                        <input type="text" name="search" id="search" className='border rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300' />
                    </div>

                </div>

                <div className='p-4 overflow-auto '>
                    {loading && <p>Loading users...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && (
                        <table className="w-full bg-white border  table-auto ">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 border">ID</th>
                                    <th className="p-2 border">Name</th>
                                    <th className="p-2 border">Email</th>
                                    <th className="p-2 border">Role</th>
                                    <th className="p-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {users.map(user => (
                                    <tr key={user._id} className="border">
                                        <td className="p-2 border"><input name="id" onChange={handleInputChange} className='min-w-full' type="text" disabled={editMode !== user._id} value={editMode === user._id ? editedUser.id : user._id} /></td>
                                        <td className="p-2 border"><input name="name" onChange={handleInputChange} className=' min-w-full' type="text" disabled={editMode !== user._id} value={editMode === user._id ? editedUser.name : user.name} /></td>
                                        <td className="p-2 border"><input name="email" onChange={handleInputChange} className='min-w-full' type="text" disabled={editMode !== user._id} value={editMode === user._id ? editedUser.email : user.email} /> </td>
                                        <td className="p-2 border">
                                            <select
                                                value={user.role}
                                                onChange={(e) =>
                                                    handleRoleChange(user._id, e.target.value)
                                                }
                                                className="border rounded p-1"
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="p-2 h-15  flex gap-2 justify-center items-center relative w-[10em]">
                                            <div className='flex  items-center gap-2 absolute left-2 right-0'>


                                                {editMode === user._id ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleSave(user._id)}
                                                            className="bg-blue-400 p-1 border rounded hover:bg-blue-500"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => setEditMode(null)}
                                                            className="bg-gray-400 p-1 border rounded hover:bg-gray-500"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEditMode(user)}
                                                        className="bg-green-400 p-1 border rounded hover:bg-green-500 flex items-center"
                                                    >
                                                        <CiEdit className="text-2xl" />
                                                        Edit
                                                    </button>
                                                )}
                                                <div className='flex items-center bg-red-400  p-1 border rounded hover:bg-red-500'>
                                                    <FaRegTrashCan className='text-2xl ' />
                                                    <button onClick={() => handleDelete(user._id)} className='   rounded' type='button'>delete</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>

        </>
    )

}
