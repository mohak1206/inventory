import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notifications from "./Notifications";

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const username = "Admin";

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold tracking-wide">
        Inventory System 🚀
      </h1>

      <div className="flex items-center space-x-6">

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Notifications */}
        <Notifications />

        {/* Profile Section */}
        <div className="relative">
          <div
            onClick={() => setDropdown(!dropdown)}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
              {username.charAt(0)}
            </div>
            <span>{username}</span>
          </div>

          {dropdown && (
            <div className="absolute right-0 mt-3 bg-white text-black rounded-lg shadow-lg w-40 py-2">
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}