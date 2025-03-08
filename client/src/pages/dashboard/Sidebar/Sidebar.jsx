import React from "react";
import { Link, useLocation } from "react-router-dom"; // <-- Import Link

import { FaHome, FaUserShield, FaUserPlus, FaUserCog } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbClipboardList } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { RiFunctionAddFill, RiLogoutBoxRFill } from "react-icons/ri";
import { LuArrowRightToLine } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";





export default function Sidebar({ user, logout, isOpen, toggleSidebar }) {
    const location = useLocation();
    return (
        <div
            className={`fixed top-0 left-0 z-50 sm:text-white flex flex-col   min-w-fit text-4xs   relative   sm:bg-slate-800  ${isOpen ? "text-white md:w-fit md:p-7 w-45 p-4 h-screen items-start bg-slate-800 rounded-r-md " : "md:rounded-none w-fit p-3 h-10  md:h-screen bg-slate-800 text-white rounded-full top-1 md:top-0 "
                }`}
        >

            <div className="flex p-2 text-white items-center mx-auto">
                <div className="flex flex-col pt-9 sm:pt-16 items-center gap-1 ">
                    {user.avatar ? (
                        <img
                            src={`http://localhost:3000${user.avatar}`}
                            alt="User Avatar"
                            className={`rounded-full border bg-white text-black object-cover  ${!isOpen
                                ? "w-7 h-7 sm:w-11 sm:h-11 hidden"
                                : "w-15 h-15 sm:w-30 sm:h-30 "
                                }`}
                        />
                    ) : (
                        <FaUserCircle className={`rounded-full border bg-white text-black   ${!isOpen
                            ? "w-7 h-7 sm:w-11 sm:h-11 sm:block hidden"
                            : "w-15 h-15 sm:w-26 sm:h-26"
                            }`} />
                    )}



                    <span className={`${!isOpen ? "text-base sm:text-sm sm:block hidden" : "text-2xl sm:text-4xl"}`}>
                        {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                    </span>
                    <span className={`text-xs md:text-xl text-sky-300 ${!isOpen && "hidden"}`}>
                        {user.role}
                    </span>
                </div>
            </div>


            <nav className={`mt-9 flex flex-col gap-4 sm:text-2xl ${!isOpen && "items-center sm:block hidden"}`}>

                <div className={`${!isOpen && "flex flex-col items-center"}`}>
                    <h1 className="text-xs text-neutral-300">Main</h1>
                    <div className="flex flex-col gap-2">
                        <Link to="/dashboard" className={`flex items-center gap-2 hover:text-purple-400 ${location.pathname === "/dashboard" && "text-purple-400 "}`}>
                            <MdOutlineSpaceDashboard />
                            <span className={`${!isOpen && "hidden"}`}>Dashboard</span>
                        </Link>
                        <Link to="/Home" className="flex items-center gap-2 hover:text-purple-400">
                            <FaHome />
                            <span className={`${!isOpen && "hidden"}`}>Eshop</span>
                        </Link>
                        <Link to="/dashboard/orders" className={`${location.pathname === "/dashboard/orders" && "text-purple-400 "} flex items-center gap-2 hover:text-purple-400`}>
                            <TbClipboardList />
                            <span className={`${!isOpen && "hidden"} `}>Orders</span>
                        </Link>
                    </div>
                </div>


                <div className={`${!isOpen && "flex flex-col items-center"}`}>
                    <h1 className="text-sm text-neutral-300">Product</h1>
                    <div className="flex flex-col gap-2">
                        <Link to="/dashboard/products" className={`flex items-center gap-2 hover:text-purple-400 ${location.pathname === "/dashboard/products" && "text-purple-400 "}`}>
                            <BsBoxSeam />
                            <span className={`${!isOpen && "hidden"}`}>All Products</span>
                        </Link>
                        <Link to="/dashboard/products/new" className={`flex items-center gap-2 hover:text-purple-400 ${location.pathname === "/dashboard/products/new" && "text-purple-400 "}`}>
                            <RiFunctionAddFill />
                            <span className={`${!isOpen && "hidden"}`}>New Product</span>
                        </Link>
                    </div>
                </div>


                <div className={`${!isOpen && "flex flex-col items-center"}`}>
                    <h1 className="text-sm text-neutral-300">Account</h1>
                    <div className="flex flex-col gap-2">
                        <Link to="/dashboard/users" className={`flex items-center gap-2 hover:text-purple-400 ${location.pathname === "/dashboard/users" && "text-purple-400 "}  `}>
                            <button disabled={user.role != 'admin'} className={`flex items-center gap-2 ${((user.role !== 'admin') || (user.name === 'admin')) ? 'text-gray-600 cursor-not-allowed' : 'cursor-pointer'} `}>
                                <FaUserShield />
                                <span className={`${!isOpen && "hidden"}`}>Manage Users</span>
                            </button>
                        </Link>
                        <Link to="/dashboard/users/create" className={`flex items-center gap-2 hover:text-purple-400 ${location.pathname === "/dashboard/users/create" && "text-purple-400 "}`}>
                            <button disabled={user.role != 'admin'} className={`flex items-center gap-2 ${((user.role !== 'admin') || (user.name === 'admin')) ? 'text-gray-600 cursor-not-allowed' : 'cursor-pointer'} `}>
                                <FaUserPlus />
                                <span className={`${!isOpen && "hidden"}`}>Create User</span>
                            </button>
                        </Link>
                        <Link to="/dashboard/account-settings" className={`flex items-center gap-2 hover:text-purple-400 ${location.pathname === "/dashboard/account-settings" && "text-purple-400 "}`}>
                            <button className="flex items-center gap-2 cursor-pointer">
                                <FaUserCog />
                                <span className={`${!isOpen && "hidden"}`}>Account Settings</span>
                            </button>

                        </Link>
                    </div>
                </div>
            </nav >

            <div
                className={`flex gap-2 hover:text-purple-400 cursor-pointer w-full mt-5 sm:text-2xl mt-auto items-center  ${!isOpen && "justify-center sm:flex hidden "
                    }`}
            >
                <RiLogoutBoxRFill onClick={logout} />
                <button className={`${!isOpen && "hidden"}`} onClick={logout}>
                    Logout
                </button>
            </div>

            <div className={`absolute top-3 left-0 w-full px-4 flex items-center  sm:text-2xl ${!isOpen ? "justify-center rounded-full " : "justify-between "}`}>
                <span className={`${!isOpen && "hidden"}`}>Eshop.com</span>
                <button onClick={toggleSidebar} className="cursor-pointer ">
                    <LuArrowRightToLine className={`transition-transform ${isOpen ? "rotate-0 " : "rotate-180 "}`} />
                </button>
            </div>
        </div >
    );
}
