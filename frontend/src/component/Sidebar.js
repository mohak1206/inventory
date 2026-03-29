import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-6 shadow-xl">

      <h1 className="text-2xl font-bold mb-8">Inventory</h1>

      <nav className="space-y-3">
        <Link to="/" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          Dashboard
        </Link>

        <Link to="/products" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          Products
        </Link>

        <Link to="/stock" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          Stock
        </Link>

        <Link to="/reports" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          Reports
        </Link>

        <Link to="/analytics" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition">      
         Analytics
        </Link>

        <Link to="/transactions" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition">
         Transactions
        </Link>

        <Link to="/profile" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          Profile
        </Link>
        <Link to="/about" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          About Us
        </Link>
        <Link to="/contact" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          Contact Us
        </Link>
      </nav>

    </div>
  );
}