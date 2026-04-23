import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

const socket = io("http://127.0.0.1:5000");

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const handleClose = () => {
    if (open) {
      setOpen(false);
      setNotifications([]);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => socket.off("notification");
  }, []);

  return (
    <div 
      className="relative" 
      ref={containerRef}
      onMouseLeave={handleClose}
    >
      {/* Bell Button */}
      <button
        onClick={() => {
          if (open) {
            handleClose();
          } else {
            setOpen(true);
          }
        }}
        className="relative w-9 h-9 rounded-lg bg-surface-high flex items-center justify-center hover:bg-surface-highest transition-colors"
      >
        <span className="text-base">🔔</span>
        {notifications.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-on-error-container text-on-primary text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown — Glassmorphism */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 rounded-xl shadow-ambient overflow-hidden z-50"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div className="px-5 py-3 bg-primary">
              <h3 className="text-sm font-display font-bold text-on-primary">
                Realtime Alerts
              </h3>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-5 text-center text-on-surface/40 font-body text-sm">
                  No notifications yet
                </p>
              ) : (
                notifications.map((n, i) => (
                  <div
                    key={i}
                    onClick={handleClose}
                    className={`
                      p-4 font-body text-sm text-on-surface cursor-pointer
                      transition-colors hover:bg-surface-high
                      ${i % 2 === 0 ? "bg-surface-low" : "bg-surface-lowest"}
                    `}
                  >
                    {/* ⭐ SAFE RENDER FIX */}
                    {typeof n === "object"
                      ? n.message || JSON.stringify(n)
                      : n}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}