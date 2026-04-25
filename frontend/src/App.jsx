import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import Stock from "./components/pages/Stock";
import Analytics from "./components/pages/Analytics";
import Reports from "./components/pages/Reports";
import Transactions from "./components/pages/Transactions";
import Profile from "./components/pages/Profile";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/common/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

<Route
  path="/"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>

<Route
  path="/stock"
  element={
    <ProtectedRoute>
      <Stock />
    </ProtectedRoute>
  }
/>

        </Routes>
      </MainLayout>
    </BrowserRouter>

    
  );
} 