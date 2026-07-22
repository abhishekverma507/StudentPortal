import express from "express";

import {
getAttendance,
addAttendance,
updateAttendance,
deleteAttendance,
saveAttendance,
getAttendanceDashboard,
getAttendanceReport,
getStudentAttendanceReport
}
from "../controllers/attendanceController.js";

const router = express.Router();


// Get All Attendance
router.get("/", getAttendance);

router.get("/student/:studentId/report", getStudentAttendanceReport);


// Add Attendance
router.post("/", addAttendance);


router.post("/bulk", saveAttendance);


// Dashboard Summary
router.get("/dashboard", getAttendanceDashboard);

router.get("/report",getAttendanceReport);


// Update Attendance
router.put("/:id", updateAttendance);


// Delete Attendance
router.delete("/:id", deleteAttendance);


export default router;