import express from "express";

import {
  addTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacherController.js";


const router = express.Router();


// Get all teachers
router.get("/", getTeachers);


// Get single teacher
router.get("/:id", getTeacherById);


// Add teacher
router.post("/", addTeacher);


// Update teacher
router.put("/:id", updateTeacher);


// Delete teacher
router.delete("/:id", deleteTeacher);


export default router;