import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();

    const activeStudents = await Student.countDocuments({
      status: "Active",
    });

    const inactiveStudents = await Student.countDocuments({
      status: "Inactive",
    });

    const suspendedStudents = await Student.countDocuments({
      status: "Suspended",
    });

    const transferredStudents = await Student.countDocuments({
      status: "Transferred",
    });

    const passedOutStudents = await Student.countDocuments({
      status: "Passed Out",
    });

    const boys = await Student.countDocuments({
      gender: "Male",
    });

    const girls = await Student.countDocuments({
      gender: "Female",
    });

    res.json({
      success: true,
      data: {
        totalStudents,
        totalTeachers,
        activeStudents,
        inactiveStudents,
        suspendedStudents,
        transferredStudents,
        passedOutStudents,
        boys,
        girls,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};