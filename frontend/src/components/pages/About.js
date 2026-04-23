import React from "react";

export default function About() {
  return (
    <div className="space-y-8">
      <h2 className="font-display text-3xl font-bold text-on-surface">
        About Us
      </h2>

      <div className="bg-surface-lowest rounded-xl p-8 shadow-ambient max-w-2xl">
        <p className="font-body text-on-surface/80 leading-relaxed">
          This Inventory Management System helps businesses manage products,
          stock levels, transactions, and reports efficiently.
        </p>
        <p className="font-body text-on-surface/50 mt-6 text-sm">
          Built with React, Flask, and MySQL.
        </p>
      </div>
    </div>
  );
}