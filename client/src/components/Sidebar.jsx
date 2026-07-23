import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  return (
    <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>

      {/* Mobile Close Button */}
      <div className="sidebar-header d-lg-none">

        <button
          className="btn btn-light"
          onClick={closeSidebar}
        >
          ✕
        </button>

      </div>


      <ul className="nav flex-column">

        <li>
          <NavLink 
            to="/dashboard"
            onClick={closeSidebar}
          >
            🏠 Dashboard
          </NavLink>
        </li>


        <li>
          <NavLink 
            to="/students"
            onClick={closeSidebar}
          >
            👨‍🎓 Students
          </NavLink>
        </li>


        <li>
          <NavLink 
            to="/teachers"
            onClick={closeSidebar}
          >
            👨‍🏫 Teachers
          </NavLink>
        </li>


        <li>
          <NavLink 
            to="/attendance"
            onClick={closeSidebar}
          >
            📅 Attendance
          </NavLink>
        </li>


        <li>
  <NavLink 
    to="/fees"
    onClick={closeSidebar}
  >
    💰 Fee Management
  </NavLink>
</li>


        <li>
          <NavLink 
            to="/reports"
            onClick={closeSidebar}
          >
            📊 Reports
          </NavLink>
        </li>


        <li>
          <NavLink 
            to="/settings"
            onClick={closeSidebar}
          >
            ⚙️ Settings
          </NavLink>
        </li>



          

      </ul>

        

    </aside>

    
  );
}

export default Sidebar;