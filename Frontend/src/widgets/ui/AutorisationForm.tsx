import { useState } from "react";
import ReactDOM from "react-dom";

interface LoginFormProps {
    onClose: () => void;
}

export default function LoginFormPortal({ onClose }: LoginFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const RES = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password }),
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
                    Login
                </h2>

                <input
                    type="text"
                    placeholder="Username or Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-[#2C1F1F] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-[#2C1F1F] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />

                <div className="flex justify-between text-sm text-gray-300 mt-1">
                    <button
                        type="button"
                        className="hover:text-white transition"
                        onClick={() => alert("Reset password flow")}
                    >
                        Forgot password?
                    </button>

                    <button
                        type="button"
                        className="hover:text-white transition"
                        onClick={() => alert("Go to registration page")}
                    >
                        No account? Sign up
                    </button>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-linear-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-105"
                >
                    Login
                </button>

                <button
                    type="button"
                    onClick={onClose}
                    className="mt-2 text-sm text-gray-300 hover:text-white transition self-center"
                >
                    Cancel
                </button>
            </form>
        </div>,
        document.getElementById("modal_root")!
    );
}
