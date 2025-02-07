import { React, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
const Dashboard = () => {

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

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




    <div>
      <h1>Welcome to the Dashboard {user.name} !</h1>
      <p>This is your dashboard page.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};






export default Dashboard;
