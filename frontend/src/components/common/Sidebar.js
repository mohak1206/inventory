import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/",             label: "Dashboard",    icon: "📊" },
  { path: "/products",     label: "Products",     icon: "📦" },
  { path: "/stock",        label: "Stock",        icon: "🏭" },
  { path: "/reports",      label: "Reports",      icon: "📋" },
  { path: "/analytics",    label: "Analytics",    icon: "📈" },
  { path: "/transactions", label: "Transactions", icon: "💸" },
  { path: "/profile",      label: "Profile",      icon: "👤" },
  { path: "/about",        label: "About Us",     icon: "📘" },
  { path: "/contact",      label: "Contact Us",   icon: "📞" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-surface-low min-h-screen p-6 flex flex-col">

      {/* Brand */}
      <h1 className="font-display text-2xl font-bold text-primary tracking-tight mb-10">
        Inventory
      </h1>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-lg
                text-sm font-medium font-body
                transition-all duration-200
                ${isActive
                  ? "bg-surface-lowest text-primary border-l-2 border-primary shadow-ambient"
                  : "text-on-surface/70 hover:bg-surface-high hover:text-on-surface"
                }
              `}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

    </div>
  );
}