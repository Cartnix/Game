import { useState } from "react";
import ReactDOM from "react-dom";

interface RegistrationFormProps {
  onClose: () => void;
  switchForm: () => void;
}

export default function RegistrationFormPortal({
  onClose,
  switchForm,
}: RegistrationFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const specialSymbols = /[!@#$%^&*()_+\-=]/;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // проверки
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password should be at least 8 characters long");
      return;
    }

    if (!specialSymbols.test(password)) {
      setErrorMessage(
        "Password should contain at least one special symbol (! @ # $ % ^ & * ( ) _ + - =)"
      );
      return;
    }

    // всё ок
    setErrorMessage(null);

    try {
      const RES = await fetch("http://127.0.0.1:8000/registration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await RES.json();
      console.log(data);
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage("Connection error: " + error.message);
        console.log("Ошибка:", error.message);
      } else {
        setErrorMessage("Connection error");
        console.log("Неизвестная ошибка:", error);
      }
    }
  };

  return ReactDOM.createPortal(
    <>
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
          <div
            className="absolute top-4 left-4 cursor-pointer text-white text-xl"
            onClick={switchForm}
          >
            ❮
          </div>

          <div
            className="absolute top-4 right-4 cursor-pointer text-white text-2xl font-bold"
            onClick={onClose}
          >
            ×
          </div>

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
        </form>
      </div>

      {errorMessage && (
        <div className="fixed rounded-md max-w-[300px] bottom-20 right-0 m-4 bg-red-500 text-white p-4 shadow-lg animate-slide-in">
          {errorMessage}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease forwards;
        }
      `}</style>
    </>,
    document.getElementById("modal_root")!
  );
}
