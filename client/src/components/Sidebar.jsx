import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h4 className="text-center py-3">
        School ERP
      </h4>

      <ul>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/students">Students</Link>
        </li>

        <li>
          <Link to="/teachers">Teachers</Link>
        </li>

        <li>
          <Link to="/attendance">Attendance</Link>
        </li>

        <li>
          <Link to="/reports">Reports</Link>
        </li>

        <li>
          <Link to="/settings">Settings</Link>
        </li>
      
        <li className="nav-item">

  <Link
    className="nav-link"
    to="/attendance-report"
  >

    <i className="bi bi-bar-chart-fill me-2"></i>

    Attendance Report

  </Link>

</li>

    <li className="nav-item">
  <Link className="nav-link" to="/fees">
    <i className="bi bi-cash-coin me-2"></i>
    Fee Collection
  </Link>
</li>
  

      </ul>

    </div>
  );
}

export default Sidebar;