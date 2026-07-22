import { useNavigate } from "react-router-dom";

function Navbar() {
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
    <nav className="navbar navbar-dark bg-primary px-4">

      <h4 className="text-white m-0">
        🎓 Student Management Portal
      </h4>

      <div className="d-flex align-items-center">

        <button className="btn btn-light me-3">
          <i className="bi bi-bell"></i>
        </button>

        <span className="text-white me-3">
          Welcome,&nbsp;
          <strong>
            {admin?.name || "Admin"}
          </strong>
        </span>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;