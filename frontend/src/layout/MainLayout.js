import React from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex bg-surface min-h-screen font-body">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-8">
          {children}
        </div>
      </div>

    </div>
  );
}