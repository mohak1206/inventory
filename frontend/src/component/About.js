import React from "react";

export default function About() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">About Us 📘</h2>

      <div className="bg-white shadow rounded-xl p-6">
        <p>
          This Inventory Management System helps businesses manage products,
          stock levels, transactions, and reports efficiently.
        </p>
        <p className="mt-4">
          Built with React, Flask, and MySQL.
        </p>
      </div>
    </div>
  );
}