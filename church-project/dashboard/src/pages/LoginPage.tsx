import type { FormEvent } from "react";
import  { useState } from "react";
import ChurchIcon from "@/assets/churchlogo.svg?react";

import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";

const ChurchLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Login:", { username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-6">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 text-center space-y-6">
        <div className="flex flex-col items-center">
    <ChurchIcon  />
    <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "var(--font-marcellus)" }}>Admin Login</h1>
  </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="relative">
            <HiOutlineUser className="absolute top-3 left-4 text-gray-400 text-lg" />
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="relative">
            <HiOutlineLockClosed className="absolute top-3 left-4 text-gray-400 text-lg" />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex justify-end text-sm">
            <a href="#" className="text-purple-600 hover:underline font-medium">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white font-bold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
          >
            LOGIN
          </button>
        </form>

        <p style={{ fontFamily: "var(--font-marcellus)" }} className="text-xs text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} Mon Eglise Admin Panel
        </p>
      </div>
    </div>
  );
};

export default ChurchLogin;
