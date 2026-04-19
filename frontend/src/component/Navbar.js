import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notifications from "./Notifications";

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="w-full bg-surface-lowest text-on-surface px-8 py-4 flex justify-between items-center ghost-border-bottom">

      {/* Title */}
      <h1 className="font-display text-xl font-bold tracking-tight text-on-surface">
        Inventory System
      </h1>

      <div className="flex items-center gap-5">

        {/* Notifications */}
        <Notifications />

        {/* Profile Section */}
        <div className="relative">
          <div
            onClick={() => setDropdown(!dropdown)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-on-primary font-display font-bold text-sm">
              {username.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium font-body text-on-surface/80 group-hover:text-on-surface transition-colors">
              {username}
            </span>
          </div>

          {dropdown && (
            <div className="absolute right-0 mt-3 bg-surface-lowest rounded-lg shadow-ambient w-44 py-2 z-50">
              <button
                onClick={() => { navigate("/profile"); setDropdown(false); }}
                className="block w-full text-left px-4 py-2.5 text-sm font-body text-on-surface/80 hover:bg-surface-high hover:text-on-surface transition-colors"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2.5 text-sm font-body text-on-error-container hover:bg-error-container transition-colors"
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