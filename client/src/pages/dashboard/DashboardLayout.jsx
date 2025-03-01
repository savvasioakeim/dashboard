import { React, useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

export default function DashboardLayout() {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);



    function toggleSidebar() {
        setIsSidebarOpen((prev) => !prev);
    }

    useEffect(() => {
        document.body.classList.add('bg-gradient-to-r', 'from-stone-800', 'via-zinc-500', 'to-slate-700', 'min-h-screen');
        return () => {
            document.body.classList.remove('bg-gradient-to-r', 'from-stone-800', 'via-zinc-500', 'to-slate-700', 'min-h-screen');
        };
    }, []);


    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/check-auth", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                });

                const data = await response.json();
                if (data.authenticated) {
                    setAuthenticated(true);
                    setUser(data.user);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Auth check failed", error);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return null;
    }
    const handleLogout = async () => {
        try {

            const response = await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                credentials: 'include',
            });

            const data = await response.json();
            if (data.message === 'Logout successful') {

                navigate('/login');
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="flex ">
            <Sidebar user={user} logout={handleLogout} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 pl-2  transition-all duration-300  ${isSidebarOpen ? "ml-5" : "ml-2"}`}>
                <Outlet context={{ user, authenticated }} />
            </div>
        </div>

    );
}
