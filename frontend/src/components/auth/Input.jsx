import { useState } from "react";
import { Icons } from "../../Icons/Icons";

const Input = ({ value, type, placeholder, onChange, label, name }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div className="py-5">
            <div className="font-bold my-1">
                <label htmlFor={name}>{label}</label>
            </div>
            <div className="relative">
                <input
                    type={type == "password" ? (showPassword ? "text" : "password") : type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e)}
                    className="bg-gray-200 w-full px-3 py-3 rounded-md border-none focus:outline-1 focus:outline-gray-300"
                />

                {type == "password" ? (
                    showPassword ? (
                        <button onClick={toggleShowPassword} className="absolute right-2 top-1/2 -translate-y-1/2 stroke-gray-200 cursor-pointer">{Icons.eye_on}</button>
                    ) : (
                        <button onClick={toggleShowPassword} className="absolute right-2 top-1/2 -translate-y-1/2 stroke-gray-200 cursor-pointer">{Icons.eye_off}</button>
                    )
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Input;
