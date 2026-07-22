import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrintAllStudents from "./pages/PrintAllStudents";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AttendanceReport from "./pages/AttendanceReport";
import AttendanceHistory from "./components/AttendanceHistory";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import "./styles/dashboard.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeeCollection from "./pages/FeeCollection";
import StudentAdmission from "./pages/StudentAdmission";
import PrintStudent from "./pages/PrintStudent";
import FeeAdmission from "./pages/FeeAdmission";
import FeeReceiptPage from "./pages/FeeReceiptPage";
import StudentProfilePrint from "./pages/StudentProfilePrint";
import TeacherAdmission from "./pages/TeacherAdmission";
import StudentFeeProfile from "./pages/StudentFeeProfile";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Redirect root */}

         {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Protected Layout */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/students"
            element={<Students />}
          />

          <Route
            path="/teachers"
            element={<Teachers />}
          />

          <Route
            path="/attendance"
            element={<Attendance />}
          />

          <Route path="/attendance-history" element={<AttendanceHistory />} />

          <Route
  path="/attendance-report"
  element={<AttendanceReport />}
/>

<Route
           path="/fees"
           element={<FeeCollection />}
          />

        </Route>

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          

          <Route
  path="/students/add"
  element={<StudentAdmission />}
        />
          <Route
  path="/students/edit/:id"
  element={<StudentAdmission />}
        />
        
        <Route
  path="/students/print/:id"
  element={<PrintStudent />}
        />

         <Route
    path="/fee-admission/:studentId?"
    element={<FeeAdmission />}
/>


<Route path="/fees/edit/:id" element={<FeeAdmission />} />

         <Route

path="/fee-receipt"

element={<FeeReceiptPage />}

        />

        <Route
  path="/teachers/new"
  element={<TeacherAdmission />}
/>

          <Route
  path="/teachers/edit/:id"
  element={<TeacherAdmission />}
/>  

          <Route
    path="/student-profile"
    element={<StudentProfilePrint />}
/>

<Route
  path="/fees/student/:id"
  element={<StudentFeeProfile />}
/>

<Route
    path="/students/print-all"
    element={<PrintAllStudents />}
/>

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

    </BrowserRouter>
  );
}

export default App;