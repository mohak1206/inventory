import React from "react";

export default function Contact() {
  return (
    <div className="space-y-8">
      <h2 className="font-display text-3xl font-bold text-on-surface">
        Contact Us
      </h2>

      <div className="bg-surface-lowest rounded-xl p-8 shadow-ambient max-w-lg space-y-4">
        <div className="flex justify-between items-center py-3 ghost-border-bottom">
          <span className="font-body text-sm text-on-surface/50">Email</span>
          <span className="font-body text-sm font-medium text-on-surface">support@inventory.com</span>
        </div>
        <div className="flex justify-between items-center py-3 ghost-border-bottom">
          <span className="font-body text-sm text-on-surface/50">Phone</span>
          <span className="font-body text-sm font-medium text-on-surface">+91 1111111111</span>
        </div>
        <div className="flex justify-between items-center py-3">
          <span className="font-body text-sm text-on-surface/50">Address</span>
          <span className="font-body text-sm font-medium text-on-surface">Palghar, India</span>
        </div>
      </div>
    </div>
  );
}