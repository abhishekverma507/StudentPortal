import { useNavigate } from "react-router-dom";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));

  function handleLogout() {
    if (!window.confirm("Are you sure you want to logout?")) {
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/login", { replace: true });
  }

  return (
    <nav className="navbar navbar-dark bg-primary px-3">

      <div className="d-flex align-items-center">

        {/* Mobile Menu Button */}
        <button
          className="btn btn-outline-light me-3 d-md-none"
          onClick={onMenuClick}
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        <h4 className="text-white m-0">
          🎓 Student Management Portal
        </h4>

      </div>

      <div className="d-flex align-items-center">

        <button className="btn btn-light me-3">
          <i className="bi bi-bell"></i>
        </button>

        <span className="text-white me-3 d-none d-md-inline">
          Welcome,&nbsp;
          <strong>{admin?.name || "Admin"}</strong>
        </span>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-md-2"></i>

          <span className="d-none d-md-inline">
            Logout
          </span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;