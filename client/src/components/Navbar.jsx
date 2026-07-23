function Navbar({ sidebarOpen, setSidebarOpen }) {

  return (
    <nav className="navbar navbar-dark bg-primary px-3">

      {/* Mobile Hamburger */}
      <button
        className="btn btn-light d-lg-none me-3"
        onClick={() => setSidebarOpen(!sidebarOpen)}

        onClick={() => {
  console.log("Menu clicked");
  setSidebarOpen(!sidebarOpen);

}}

      >
        ☰
      </button>


      <h4 className="text-white m-0">
        🎓 Student Management Portal
      </h4>


      <div className="ms-auto d-flex align-items-center">

  {/* Notification */}
  <button className="btn btn-light me-2">
    <i className="bi bi-bell"></i>
  </button>


  {/* Profile */}
  <button className="btn btn-light me-2">
    <i className="bi bi-person-circle"></i>
  </button>


  {/* Logout */}
  <button
  className="btn btn-danger"
  onClick={() => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  }}
>
  <i className="bi bi-box-arrow-right"></i>
  <span className="ms-1 d-none d-md-inline">
    Logout
  </span>
</button>


</div>

    </nav>
  );
}

export default Navbar;