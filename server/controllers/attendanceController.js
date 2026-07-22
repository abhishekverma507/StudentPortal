import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";

// ===============================
// Get All Attendance
// ===============================

export const getAttendance = async (req, res) => {
  try {

    const attendance = await Attendance.find()
      .populate(
        "studentId",
        "admissionNumber rollNumber firstName lastName className section"
      )
      .sort({ attendanceDate: -1 });

    res.status(200).json({
      success: true,
      data: attendance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Add Attendance
// ===============================
export const addAttendance = async (req, res) => {
  try {

    const attendance =
      await Attendance.create(req.body);

    res.status(201).json({
      success: true,
      message: "Attendance added successfully.",
      data: attendance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Update Attendance
// ===============================
export const updateAttendance = async (req, res) => {
  try {

    const attendance =
      await Attendance.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found.",
      });
    }

    res.json({
      success: true,
      message: "Attendance updated successfully.",
      data: attendance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Delete Attendance
// ===============================
export const deleteAttendance = async (req, res) => {
  try {

    const attendance =
      await Attendance.findByIdAndDelete(
        req.params.id
      );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found.",
      });
    }

    res.json({
      success: true,
      message: "Attendance deleted successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ===============================
// Save Attendance (Bulk)
// ===============================
export const saveAttendance = async (req, res) => {
  try {
    const { attendanceDate, attendance } = req.body;

    if (!attendanceDate || !attendance) {
      return res.status(400).json({
        success: false,
        message: "Attendance date and records are required.",
      });
    }

    for (const record of attendance) {
      await Attendance.findOneAndUpdate(
        {
          studentId: record.studentId,
          attendanceDate: attendanceDate,
        },
        {
          studentId: record.studentId,
          attendanceDate: attendanceDate,
          status: record.status,
          remarks: record.remarks,
        },
        {
          upsert: true,
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Attendance saved successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getAttendanceDashboard = async (req,res)=>{

try{


const today = new Date();

today.setHours(0,0,0,0);


const tomorrow = new Date(today);

tomorrow.setDate(
tomorrow.getDate()+1
);



const records =
await Attendance.find({

attendanceDate:{
$gte:today,
$lt:tomorrow
}

});

const totalStudents = await Student.countDocuments();

let present = 0;

let absent = 0;

let late = 0;

let leave = 0;



records.forEach((record)=>{


if(record.status==="Present")
present++;


if(record.status==="Absent")
absent++;


if(record.status==="Late")
late++;


if(record.status==="Leave")
leave++;


});


const percentage =
totalStudents > 0
?
((present / totalStudents) * 100).toFixed(2)
:
0;


res.json({

success:true,

data:{

totalStudents,

present,

absent,

late,

leave,

percentage

}

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};

export const getAttendanceReport = async(req,res)=>{

try{

const attendance = await Attendance
.find()
.populate(
"studentId",
"firstName lastName rollNumber className section"
)
.sort({
attendanceDate:-1
});


res.json({
success:true,
data:attendance
});


}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};

// ===============================
// Student Attendance Report
// ===============================

export const getStudentAttendanceReport = async (req, res) => {

  try {

    const { studentId } = req.params;


    const attendance = await Attendance.find({
      studentId: studentId
    })
    .populate(
      "studentId",
      "admissionNumber rollNumber firstName lastName className section"
    )
    .sort({
      attendanceDate: -1
    });



    if(attendance.length === 0){

      return res.status(404).json({

        success:false,

        message:"No attendance record found for this student."

      });

    }



    let present = 0;
    let absent = 0;
    let late = 0;
    let leave = 0;



    attendance.forEach((record)=>{


      switch(record.status){

        case "Present":
          present++;
          break;


        case "Absent":
          absent++;
          break;


        case "Late":
          late++;
          break;


        case "Leave":
          leave++;
          break;

      }


    });



    const totalAttendance = attendance.length;



    const percentage =
      ((present / totalAttendance) * 100)
      .toFixed(2);



    res.status(200).json({

      success:true,

      data:{

        student: attendance[0].studentId,

        totalAttendance,

        present,

        absent,

        late,

        leave,

        percentage,

        records: attendance

      }

    });


  }
  catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};