import { useState } from "react";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceHistory from "../components/AttendanceHistory";
import AttendanceDashboard from "../components/AttendanceDashboard";
import { saveAttendance } from "../services/attendanceService";
import { toast } from "react-toastify";


function Attendance() {

  async function handleSaveAttendance(data) {

    try {

      await saveAttendance(data);

      toast.success("Attendance saved successfully!");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to save attendance."
      );

    }

  }

  return (

    <div className="container-fluid">

      <h2 className="mb-4">
Attendance Management
</h2>


<AttendanceDashboard/>


<AttendanceForm
onSave={handleSaveAttendance}
/>


<AttendanceHistory/>

      </div>

  );

}

export default Attendance;