import "./Form.css";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUnForm({ toggleForm }) {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const navigate = useNavigate();

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

    function toggleEye() {
        const input = document.getElementById("password-input");

        if (input) {
            const cursorPosition = input.selectionStart;
            setShowPassword((prevState) => !prevState);

            setTimeout(() => {
                input.selectionStart = cursorPosition;
                input.selectionEnd = cursorPosition;
                input.focus();
            }, 0);
        }
    }
    function toggleEye2() {
        const input = document.getElementById("confirmPassword-input");

        if (input) {
            const cursorPosition = input.selectionStart;
            setShowConfirmPassword((prevState) => !prevState);

            setTimeout(() => {
                input.selectionStart = cursorPosition;
                input.selectionEnd = cursorPosition;
                input.focus();
            }, 0);
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("All fields are required");
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
                confirmPassword: confirmPassword,
            }),
            credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            navigate("/dashboard");
        } else {
            alert(data.message);
        }
    }
    useEffect(() => {
        document.body.classList.add("form-body");

        return () => {
            document.body.classList.remove("form-body");
        };
    }, []);

    useEffect(() => {
        document.body.classList.add(
            "bg-gradient-to-r",
            "from-stone-800",
            "via-zinc-500",
            "to-slate-700",
            "min-h-screen"
        );
        return () => {
            document.body.classList.remove(
                "bg-gradient-to-r",
                "from-stone-800",
                "via-zinc-500",
                "to-slate-700",
                "min-h-screen"
            );
        };
    }, []);

    return (
        <form onSubmit={handleSubmit} className="container rounded flex flex-col pb-2 pl-1 pr-1">
            <div className="header pt-20 pb-5 pl-5 pr-5 sm:pl-10 sm:pr-10">
                <p className="mb-5 text-md sm:text-2xl font-bold ">
                    Create new account
                </p>
                <div className="emailLabel">
                    <span className="emailSpan">
                        <label className="text-xs sm:text-base" htmlFor="name">
                            Name
                        </label>
                    </span>
                    <input
                        value={name}
                        onChange={handleNameChanges}
                        type="text"
                        className="form-input-text text-xs sm:text-base w-full p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300"
                    />
                </div>
                <div className="emailLabel">
                    <span className="emailSpan">
                        <label className="text-xs sm:text-base" htmlFor="email">
                            Email
                        </label>
                    </span>
                    <input
                        value={email}
                        onChange={handleEmailChanges}
                        type="text"
                        className="form-input-text text-xs sm:text-base w-full p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300"
                    />
                </div>

                <div className="mb-2">

                    <div className="flex flex-col">

                        <div className="flex flex-row justify-between mt-2 mb-2">
                            <div>
                                <span className="text-xs sm:text-base">Password</span>
                            </div>

                        </div>
                        <div
                            className="passwordContainer "
                            style={{ position: "relative" }}
                        >
                            <input
                                id="password-input"
                                value={password}
                                onChange={handlePasswordChange}
                                type={showPassword ? "text" : "password"}
                                className="form-input-text form-input-password text-xs sm:text-base w-full p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300"
                                onBlur={(e) => {
                                    const toggleButton = document.getElementById("toggle-password");
                                    if (e.relatedTarget === toggleButton) {
                                        e.target.focus();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={toggleEye}
                                className="absolute right-2 bottom-1.5 sm:right-3 sm:bottom-2 text-sm sm:text-xl cursor-pointer"
                                id="toggle-password"
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="flex flex-row justify-between mt-2 mb-2">
                            <div>
                                <span className="text-xs sm:text-base">Confirm Password</span>
                            </div>

                        </div>
                        <div
                            className="passwordContainer mb-3"
                            style={{ position: "relative" }}
                        >
                            <input
                                id="confirmPassword-input"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-input-text form-input-password text-xs sm:text-base w-full p-2 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300"
                                onBlur={(e) => {
                                    const toggleButton = document.getElementById("toggle-confirmPassword");
                                    if (e.relatedTarget === toggleButton) {
                                        e.target.focus();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={toggleEye2}
                                className="absolute right-2 bottom-1.5 sm:right-3 sm:bottom-2 text-sm sm:text-xl cursor-pointer"
                                id="toggle-confirmPassword"
                            >
                                {showConfirmPassword ? <FaRegEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                </div>



                <div className="text-center mt-2">
                    <button
                        onClick={handleSubmit}
                        className="w-full text-xs sm:text-base flex items-center justify-center bg-blue-600 text-white rounded hover:border-transparent hover:bg-blue-700 w-110 text-1xl h-10 hover:cursor-pointer active:ring-3 active:ring-blue-300"
                    >
                        Sign up
                    </button>
                </div>
            </div>

            <div className="text-xs sm:text-base text-center mt-5 w-full bg-neutral-200 h-14 flex items-center justify-center mt-7 rounded">
                <p>
                    Already have an account?
                    <span onClick={toggleForm} className="ml-2 text-purple-700 underline hover:text-purple-600 hover:cursor-pointer">
                        Sign in
                    </span>{" "}

                </p>
            </div>
        </form>
    );
}
