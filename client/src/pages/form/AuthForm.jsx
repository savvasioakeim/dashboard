import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { motion } from "framer-motion";

export default function AuthForm() {
    const [isSignIn, setIsSignIn] = useState(true);

    function toggleForm() {
        setIsSignIn((prev) => !prev);
    }


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
