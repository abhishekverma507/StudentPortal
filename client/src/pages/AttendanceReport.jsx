import { useEffect, useState } from "react";
import axios from "axios";

function AttendanceReport() {

  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {

      const res = await axios.get(
        `${API}/students`
      );

      setStudents(res.data.data);

    } catch (error) {

      console.log(error);

    }
  };

  const fetchReport = async (id) => {

    if (!id) {
      setReport(null);
      return;
    }

    try {

      const res = await axios.get(
        `${API}/attendance/student/${id}/report`
      );

      setReport(res.data.data);

    } catch (error) {

      console.log(error);
      setReport(null);

    }

  };

  return (

    <div className="container mt-4">

      <h2 className="mb-4">
        Student Attendance Report
      </h2>

      <div className="mb-4">

        <label className="form-label">
          Select Student
        </label>

        <select
          className="form-select"
          value={studentId}
          onChange={(e) => {
            setStudentId(e.target.value);
            fetchReport(e.target.value);
          }}
        >

          <option value="">
            Select Student
          </option>

          {students.map((student) => (

            <option
              key={student._id}
              value={student._id}
            >
              {student.firstName} {student.lastName}
            </option>

          ))}

        </select>

      </div>

      {report && (

        <>

          <div className="card mb-4">

            <div className="card-body">

              <h4>
                {report.student.firstName} {report.student.lastName}
              </h4>

              <p>
                <strong>Admission No:</strong>{" "}
                {report.student.admissionNumber}
              </p>

              <p>
                <strong>Roll No:</strong>{" "}
                {report.student.rollNumber}
              </p>

              <p>
                <strong>Class:</strong>{" "}
                {report.student.className} - {report.student.section}
              </p>

            </div>

          </div>

          <div className="row">

            <div className="col-md-2">

              <div className="card text-center">

                <div className="card-body">

                  <h3>{report.totalAttendance}</h3>

                  <p>Total</p>

                </div>

              </div>

            </div>

            <div className="col-md-2">

              <div className="card text-center bg-success text-white">

                <div className="card-body">

                  <h3>{report.present}</h3>

                  <p>Present</p>

                </div>

              </div>

            </div>

            <div className="col-md-2">

              <div className="card text-center bg-danger text-white">

                <div className="card-body">

                  <h3>{report.absent}</h3>

                  <p>Absent</p>

                </div>

              </div>

            </div>

            <div className="col-md-2">

              <div className="card text-center bg-warning">

                <div className="card-body">

                  <h3>{report.late}</h3>

                  <p>Late</p>

                </div>

              </div>

            </div>

            <div className="col-md-2">

              <div className="card text-center bg-info text-white">

                <div className="card-body">

                  <h3>{report.leave}</h3>

                  <p>Leave</p>

                </div>

              </div>

            </div>

            <div className="col-md-2">

              <div className="card text-center bg-primary text-white">

                <div className="card-body">

                  <h3>{report.percentage}%</h3>

                  <p>Attendance</p>

                </div>

              </div>

            </div>

          </div>

          <div className="progress mt-4">

            <div
              className="progress-bar"
              style={{
                width: `${report.percentage}%`
              }}
            >
              {report.percentage}%
            </div>

          </div>

          <table className="table table-bordered table-striped mt-4">

            <thead>

              <tr>

                <th>Date</th>
                <th>Status</th>
                <th>Remarks</th>

              </tr>

            </thead>

            <tbody>

              {report.records.map((record) => (

                <tr key={record._id}>

                  <td>
                    {new Date(
                      record.attendanceDate
                    ).toLocaleDateString()}
                  </td>

                  <td>{record.status}</td>

                  <td>{record.remarks}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </>

      )}

    </div>

  );

}

export default AttendanceReport;