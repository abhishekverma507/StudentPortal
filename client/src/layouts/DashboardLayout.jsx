import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <>
      <Navbar />

      <div className="app-container">
        <Sidebar />

        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;