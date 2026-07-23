import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar bg-dark text-white">

      <h4 className="text-center py-3 border-bottom">
        School ERP
      </h4>

      <ul className="nav flex-column">

        <li className="nav-item">
          <Link className="nav-link text-white" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/students">
            Students
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/teachers">
            Teachers
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/attendance">
            Attendance
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/attendance-report">
            <i className="bi bi-bar-chart-fill me-2"></i>
            Attendance Report
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/fees">
            <i className="bi bi-cash-coin me-2"></i>
            Fee Collection
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/reports">
            Reports
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/settings">
            Settings
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;