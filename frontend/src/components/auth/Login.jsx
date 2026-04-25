import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e) => {
   e.preventDefault();

   const response = await fetch("http://127.0.0.1:5000/login", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ email, password })
   });

   const data = await response.json();

   if (response.ok) {
     localStorage.setItem("isLoggedIn", "true");
     localStorage.setItem("role", data.role);
     localStorage.setItem("username", data.name);
     navigate("/");
   } else {
     alert(data.msg);
   }
 };

  return (
    <div className="flex items-center justify-center min-h-screen bg-surface">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-surface-lowest shadow-ambient p-10 rounded-2xl w-[400px] space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl font-bold text-on-surface">
            Welcome Back
          </h2>
          <p className="font-body text-sm text-on-surface/50">
            Sign in to your inventory account
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="ledger-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="ledger-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary w-full py-3"
        >
          Sign In
        </button>

        <p className="text-xs text-on-surface/40 text-center font-body">
          Demo: admin@inventory.com / 1234
        </p>
      </motion.form>
    </div>
  );
}