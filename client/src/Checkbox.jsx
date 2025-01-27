import { useState } from "react";

function CheckboxWithCheckmark() {
    const [checked, setChecked] = useState(false);
    const [hasFocus, setHasFocus] = useState(false); // Track focus state

    const handleChange = () => {
        setChecked(!checked);
    };

    const handleFocus = () => {
        setHasFocus(true);
    };

    const handleBlur = () => {
        setHasFocus(false);
    };

    return (
        <label className="relative inline-block cursor-pointer outline-none">
            <input
                type="checkbox"
                id="checkbox"
                checked={checked}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="absolute opacity-0"
            />
            <span
                className={`w-6 h-6 border-2 rounded-lg border-gray-500 flex items-center justify-center relative transition-all duration-200 ${checked
                        ? "bg-purple-500 border-purple-500" // Changed to standard purple color
                        : "bg-white"
                    } ${hasFocus ? "outline outline-2 outline-blue-500" : ""}`}
            >
                {/* Checkmark SVG */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`checkmark absolute top-0 left-0 w-5 h-5 transition-opacity ${checked ? "opacity-100" : "opacity-0"
                        }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path
                        d="M20 6L9 17l-5-5"
                        className={`stroke-white`} // Set checkmark color to white
                    />
                </svg>
            </span>
        </label>
    );
}

export default CheckboxWithCheckmark;
