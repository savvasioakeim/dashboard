import "./Form.css";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import CheckboxWithCheckmark from "./Checkbox";

export default function SignInForm({ toggleForm }) {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function handleEmailChanges(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
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

    async function handleSubmit(e) {
        e.preventDefault();
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
        <form className="container rounded flex flex-col pb-2 pl-1 pr-1">
            <div className="header pt-20 pb-5 pl-5 pr-5 sm:pl-10 sm:pr-10">
                <p className="mb-5 text-md sm:text-2xl font-bold ">
                    Sign in to your account
                </p>
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
                    <div className="flex flex-row justify-between mt-2 mb-2">
                        <div>
                            <span className="text-xs sm:text-base">Password</span>
                        </div>
                        <div>
                            <span className="text-purple-700 text-xs sm:text-base hover:cursor-pointer">
                                Forgot your password?
                            </span>
                        </div>
                    </div>

                    <div
                        className="passwordContainer mb-3"
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
                </div>

                <div className="flex items-center mt-1 mb-3">
                    <CheckboxWithCheckmark />
                    <span className="ml-2 text-xs sm:text-base">
                        Remember me on this device
                    </span>
                </div>

                <div className="text-center mt-2">
                    <button
                        onClick={handleSubmit}
                        className="w-full text-xs sm:text-base flex items-center justify-center bg-blue-600 text-white rounded hover:border-transparent hover:bg-blue-700 w-110 text-1xl h-10 hover:cursor-pointer active:ring-3 active:ring-blue-300"
                    >
                        Sign in
                    </button>
                </div>
            </div>

            <div className="text-xs sm:text-base text-center mt-5 w-full bg-neutral-200 h-14 flex items-center justify-center mt-7 rounded">
                <p>
                    Click{" "}
                    <span onClick={toggleForm} className="text-purple-700 underline hover:text-purple-600 hover:cursor-pointer">
                        here
                    </span>{" "}
                    to make an account
                </p>
            </div>
        </form>
    );
}
