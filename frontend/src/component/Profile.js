import React from "react";

export default function Profile() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile 👤</h2>

      <div className="bg-white shadow rounded-xl p-6">
        <p><strong>Name:</strong> Admin User</p>
        <p><strong>Email:</strong> admin@inventory.com</p>
        <p><strong>Role:</strong> Administrator</p>
      </div>
    </div>
  );
}