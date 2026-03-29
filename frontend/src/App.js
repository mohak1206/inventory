import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Dashboard from "./component/Dashboard";
import Products from "./component/Products";
import Stock from "./component/Stock";
import Analytics from "./component/Analytics";
import Reports from "./component/Reports";
import Transactions from "./component/Transactions";
import Profile from "./component/Profile";
import About from "./component/About";
import Contact from "./component/Contact";
import Login from "./component/Login";
import ProtectedRoute from "./component/ProtectedRoute";

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