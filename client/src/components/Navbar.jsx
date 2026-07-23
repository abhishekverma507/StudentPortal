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


      <div className="ms-auto">

        <button className="btn btn-light me-2">
          <i className="bi bi-bell"></i>
        </button>


        <button className="btn btn-light">
          <i className="bi bi-person-circle"></i>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;