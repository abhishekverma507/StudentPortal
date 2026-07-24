import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>

      {/* Mobile Close Button */}
      <div className="sidebar-header-mobile d-lg-none text-end p-3">
        <button
          className="btn btn-light"
          onClick={closeSidebar}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      {/* Logo */}
      <div className="sidebar-brand text-center py-4">

        <i className="bi bi-mortarboard-fill display-5 text-primary"></i>

        <h5 className="fw-bold mt-2 mb-1">
          School ERP
        </h5>

        <small className="text-muted">
          Student Management System
        </small>

      </div>

      <ul className="nav flex-column">

        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/dashboard"
            onClick={closeSidebar}
          >
            <i className="bi bi-speedometer2"></i>
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/students"
            onClick={closeSidebar}
          >
            <i className="bi bi-people-fill"></i>
            Students
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/teachers"
            onClick={closeSidebar}
          >
            <i className="bi bi-person-badge-fill"></i>
            Teachers
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/attendance"
            onClick={closeSidebar}
          >
            <i className="bi bi-calendar-check"></i>
            Attendance
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/fees"
            onClick={closeSidebar}
          >
            <i className="bi bi-cash-stack"></i>
            Fee Management
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/reports"
            onClick={closeSidebar}
          >
            <i className="bi bi-bar-chart-fill"></i>
            Reports
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/settings"
            onClick={closeSidebar}
          >
            <i className="bi bi-gear-fill"></i>
            Settings
          </NavLink>
        </li>

      </ul>

      <div className="sidebar-footer text-center mt-auto mb-3">

        <small className="text-muted">
          Version 1.0.0
        </small>

      </div>

    </aside>
  );
}

export default Sidebar;