import React from "react";

export default function Profile() {
  const username = localStorage.getItem("username") || "Admin User";
  const role = localStorage.getItem("role") || "Administrator";

  return (
    <div className="space-y-8">
      <h2 className="font-display text-3xl font-bold text-on-surface">
        Profile
      </h2>

      <div className="bg-surface-lowest rounded-xl p-8 shadow-ambient max-w-lg">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
            <span className="font-display text-2xl font-bold text-on-primary">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-on-surface">
              {username}
            </h3>
            <p className="font-body text-sm text-on-surface/50">{role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 ghost-border-bottom">
            <span className="font-body text-sm text-on-surface/50">Name</span>
            <span className="font-body text-sm font-medium text-on-surface">{username}</span>
          </div>
          <div className="flex justify-between items-center py-3 ghost-border-bottom">
            <span className="font-body text-sm text-on-surface/50">Email</span>
            <span className="font-body text-sm font-medium text-on-surface">admin@inventory.com</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="font-body text-sm text-on-surface/50">Role</span>
            <span className="chip-success">{role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}