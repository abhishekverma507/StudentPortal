import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";

function AttendanceForm({ onSave }) {

  const [students, setStudents] = useState([]);

  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {

    try {

      const response = await axios.get(`${API_URL}/students`);

      const studentList = response.data.data;

      setStudents(studentList);

      setAttendance(
        studentList.map((student) => ({
          studentId: student._id,
          status: "Present",
          remarks: "",
        }))
      );

    } catch (error) {

      console.error(error);

    }

  }

  function handleStatusChange(index, value) {

    const updated = [...attendance];

    updated[index].status = value;

    setAttendance(updated);

  }

  function handleRemarksChange(index, value) {

    const updated = [...attendance];

    updated[index].remarks = value;

    setAttendance(updated);

  }

  function handleSubmit(e) {

    e.preventDefault();

    onSave({
      attendanceDate,
      attendance,
    });

  }

  return (

    <div className="card mb-4">

      <div className="card-body">

        <h4 className="mb-3">

          Mark Attendance

        </h4>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">

              Attendance Date

            </label>

            <input
              type="date"
              className="form-control"
              value={attendanceDate}
              onChange={(e)=>
                setAttendanceDate(e.target.value)
              }
            />


          </div>

          <table className="table table-bordered">

            <thead>

              <tr>

                <th>Student</th>

                <th>Status</th>

                <th>Remarks</th>

              </tr>

            </thead>

            <tbody>

              {students.map((student,index)=>(

                <tr key={student._id}>

                  <td>

                    {student.firstName}{" "}
                    {student.lastName}

                  </td>

                  <td>

                    <select
                      className="form-select"
                      value={attendance[index]?.status}
                      onChange={(e)=>
                        handleStatusChange(
                          index,
                          e.target.value
                        )
                      }
                    >

                      <option>Present</option>

                      <option>Absent</option>

                      <option>Late</option>

                      <option>Leave</option>

                    </select>

                  </td>

                  <td>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Remarks"
                      value={
                        attendance[index]?.remarks
                      }
                      onChange={(e)=>
                        handleRemarksChange(
                          index,
                          e.target.value
                        )
                      }
                    />

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <button
            className="btn btn-primary"
            type="submit"
          >
            Save Attendance
          </button>

        </form>

      </div>

    </div>

  );

}

export default AttendanceForm;