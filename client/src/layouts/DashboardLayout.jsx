import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="app-container">

        <div
          className={`sidebar ${sidebarOpen ? "show" : ""}`}
        >
          <Sidebar />
        </div>

        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div className="content">
          <Outlet />
        </div>

      </div>
    </>
  );
}

export default DashboardLayout;