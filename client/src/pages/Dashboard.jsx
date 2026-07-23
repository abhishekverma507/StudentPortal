import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import { getDashboardStats } from "../services/dashboardService";
import AttendanceSummary from "../components/AttendanceSummary";


function Dashboard() {

const [stats, setStats] = useState({
  totalStudents: 0,
  totalTeachers: 0,
  activeStudents: 0,
  inactiveStudents: 0,
  suspendedStudents: 0,
  transferredStudents: 0,
  passedOutStudents: 0,
  boys: 0,
  girls: 0,
});

useEffect(() => {
  fetchDashboard();
}, []);

async function fetchDashboard() {
  try { 

    const response = await getDashboardStats();

    console.log("FULL DASHBOARD RESPONSE:", response);

    console.log("DATA:", response.data);

    setStats(response.data.data);

  } catch (error) {
    console.error("Dashboard Error:", error);
  }
}

  return (
      <div className="container-fluid">

      <div className="row align-items-center mb-4">

  <div className="col-12 col-md-8">

    <h2 className="fw-bold">
      👋 Welcome back, Admin
    </h2>

    <p className="text-muted mb-0">
      Manage your school from one dashboard.
    </p>

  </div>

  <div className="col-12 col-md-4 text-md-end mt-2 mt-md-0">

    <h5 className="mb-0">
      {new Date().toLocaleDateString()}
    </h5>

    <small className="text-muted">
      School ERP System
    </small>

  </div>

</div>

      <div className="row">

        <DashboardCard
          title="Total Students"
          value={stats.totalStudents}
          icon="bi bi-people-fill"
        />

        <DashboardCard
          title="Active Students"
          value={stats.activeStudents}
          icon="bi bi-person-check-fill"
        />

        <DashboardCard
          title="Male Students"
          value={stats.boys}
          icon="bi bi-gender-male"
        />

        <DashboardCard
          title="Female Students"
          value={stats.girls}
          icon="bi bi-gender-female"
        />

        <DashboardCard
          title="Inactive Students"
          value={stats.inactiveStudents}
          icon="bi bi-person-x-fill"
/>

<DashboardCard
  title="Suspended Students"
  value={stats.suspendedStudents}
  icon="bi bi-person-fill-slash"
/>

<DashboardCard
  title="Transferred Students"
  value={stats.transferredStudents}
  icon="bi bi-arrow-left-right"
/>

<DashboardCard
  title="Passed Out Students"
  value={stats.passedOutStudents}
  icon="bi bi-mortarboard-fill"
/>

<DashboardCard
  title="Teachers"
  value={stats.totalTeachers}
  icon="bi bi-person-workspace"
/>

      </div>

      <div
  className="card border-0 shadow-lg mt-4"
  style={{
    background:
      "linear-gradient(135deg,#0d6efd,#4f8dfd)",
    color: "white",
    borderRadius: "15px",
  }}
>
        <div className="card-body p-4">

  <h3>
    🎓 School Management System
  </h3>

  <p className="mb-0">

    Welcome to your ERP Dashboard.

    Manage students, teachers, attendance,
    fees and reports from one place.

  </p>

</div>
</div>

<AttendanceSummary />

</div>
  );
}

export default Dashboard;