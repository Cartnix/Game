import { useState } from "react";
import ReactDOM from "react-dom";

interface RegistrationFormProps {
    onClose: () => void;
}

export default function RegistrationFormPortal({ onClose }: RegistrationFormProps) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const RES = await fetch("http://127.0.0.1:8000/registration", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await RES.json();
        console.log(data);
        onClose();
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center">
            <div
                className="absolute inset-0 backdrop-blur-md bg-black/40"
                onClick={onClose}
            ></div>

            <form
                onSubmit={handleSubmit}
                className="relative z-10 flex flex-col gap-4 bg-linear-to-br from-[#413030] to-[#5C3B3B] p-8 rounded-3xl shadow-2xl w-[350px] sm:w-[400px]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-semibold text-white text-center mb-4">
                    Registration
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-[#2C1F1F] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-[#2C1F1F] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-[#2C1F1F] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-[#2C1F1F] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    required
                />

                <button
                    type="submit"
                    className="mt-4 bg-linear-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-105 cursor-pointer"
                >
                    Register
                </button>

                <button
                    type="button"
                    onClick={onClose}
                    className="mt-2 text-sm text-gray-300 hover:text-white transition self-center cursor-pointer"
                >
                    Cancel
                </button>
            </form>
        </div>,
        document.getElementById("modal_root")!
    );
}
