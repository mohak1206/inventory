import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://127.0.0.1:5000");

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => socket.off("notification");
  }, []);

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 duration-200"
      >
        🔔
        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-2xl rounded-lg overflow-hidden">
          <h3 className="bg-gray-800 text-white text-center py-2">
            Realtime Alerts
          </h3>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-center text-gray-500">
                No notifications yet
              </p>
            ) : (
              notifications.map((n, i) => (
                <div
                  key={i}
                  className="p-3 border-b hover:bg-gray-100 duration-200"
                >
                  {/* ⭐ SAFE RENDER FIX */}
                  {typeof n === "object"
                    ? n.message || JSON.stringify(n)
                    : n}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}