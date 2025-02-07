import { useState, useEffect } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export default function AuthForm() {
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate();

    function toggleForm() {
        setIsSignIn((prev) => !prev);
    }
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/check-auth", {
                    credentials: "include",
                });

                const data = await response.json();
                if (data.authenticated) {
                    // If the user is already authenticated, redirect them to the dashboard
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error("Auth check failed", error);
            }
        };

        checkAuth();
    }, [navigate]);


    return (
        <motion.div
            key={isSignIn ? "sign-in" : "sign-up"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
        >
            {isSignIn ? <SignInForm toggleForm={toggleForm} /> : <SignUpForm toggleForm={toggleForm} />}
        </motion.div>
    );
}
