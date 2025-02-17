import React from "react"
import reactLogo from "../../../assets/react.svg";
import { FaHome } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbClipboardList } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { RiFunctionAddFill } from "react-icons/ri";
import { FaUserShield } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { LuArrowRightToLine } from "react-icons/lu";












export default function Sidebar({ name, logout, isOpen, toggleSidebar }) {







    return (
        <div className={`bg-slate-800 text-white flex flex-col items-start max-w-fit   text-4xs h-screen  rounded relative transition-all ${isOpen ? "w-fit p-7" : "w-fit p-3"}`} >
            <div className={`flex    p-2  text-white  items-center   mx-auto  `}>

                <div className={`flex  flex-col  pt-9 sm:pt-16 items-center gap-1`}>
                    <div>
                        <img className={`  ${!isOpen ? "w-7 h-7 sm:w-11 sm:h-11" : "w-15 h-15 sm:w-18 sm:h-18"}`} src={reactLogo} alt="React Logo" />
                    </div>

                    <div>
                        <span className={`${!isOpen ? "text-base sm:text-sm" : "text-2xl sm:text-4xl"}`}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                    </div>
                    <div>
                        <span className={`text-xs text-green-200 ${!isOpen && "hidden"}`}>Admin</span>
                    </div>








                </div>

            </div>
            <div>
                <nav className={` mt-9 flex flex-col gap-4 sm:text-2xl ${!isOpen && "items-center"} `}>


                    <div>

                        <div className="flex flex-col gap-4 ">
                            <h1 className="text-xs text-neutral-300">Main</h1>

                            <div className="flex flex-col  gap-2  ">
                                <div className="flex items-center gap-2 hover:text-purple-400 cursor-pointer">
                                    <FaHome />
                                    <a className={`${!isOpen && "hidden"}`} href="/home">Eshop</a>
                                </div>
                                <div className="flex items-center gap-2 hover:text-purple-400 cursor-pointer">
                                    <MdOutlineSpaceDashboard />

                                    <a className={`${!isOpen && "hidden"}`}>Dashboard</a>
                                </div>
                                <div className="flex items-center gap-2 hover:text-purple-400 cursor-pointer">
                                    <TbClipboardList />

                                    <a className={`${!isOpen && "hidden"}`}>Orders</a>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className={`flex flex-col gap-4 ${!isOpen && "items-center"}`}>
                        <h1 className="text-sm text-neutral-300">Product</h1>
                        <div className="flex flex-col  gap-2  ">
                            <div className="flex items-center gap-2 hover:text-purple-400 cursor-pointer">
                                <BsBoxSeam />
                                <a className={`${!isOpen && "hidden"}`}>All Products</a>
                            </div>
                            <div className="flex items-center gap-2 hover:text-purple-400 cursor-pointer">
                                <RiFunctionAddFill />

                                <a className={`${!isOpen && "hidden"}`}>New Product</a>
                            </div>
                        </div>

                    </div >
                    <div className={`flex flex-col gap-4 ${!isOpen && "items-center"}`}>
                        <h1 className="text-sm text-neutral-300">Account</h1>
                        <div className="flex flex-col  gap-2  ">
                            <div className="flex items-center gap-2 hover:text-purple-400 cursor-pointer">
                                <FaUserShield />


                                <a className={`${!isOpen && "hidden"}`} href="">Manage Users</a>
                            </div>
                            <div className="flex items-center gap-2 hover:text-purple-400 cursor-pointer">
                                <FaUserPlus />




                                <a className={`${!isOpen && "hidden"}`} href="">Create User</a>
                            </div>
                            <div className="flex items-center gap-2 hover:text-purple-400 cursor-pointer">
                                <FaUserCog />


                                <a className={`${!isOpen && "hidden"}`} href="">Account Settings</a>
                            </div>
                        </div>

                    </div>




                </nav>

            </div>
            <div className={`flex  gap-2 hover:text-purple-400 cursor-pointer w-full mt-5 sm:text-2xl mt-auto items-center ${!isOpen && "justify-center"} `} >
                <RiLogoutBoxRFill />

                <button className={`${!isOpen && "hidden"}`} onClick={logout}>Logout</button>
            </div>

            <div className="absolute top-3 left-0 w-full px-4 flex items-center justify-between sm:text-2xl">
                <div>
                    <span className={`${!isOpen && "hidden"}`}>Eshop.com</span>
                </div>
                <div>
                    <button onClick={toggleSidebar} className=" cursor-pointer"><LuArrowRightToLine className={`transition-transform ${isOpen ? "rotate-0" : "rotate-180"}`} />

                    </button>
                </div>

            </div>


        </div>
    )
}