import { useLocation } from "react-router-dom";

function StudentProfilePrint() {
  const { state: student } = useLocation();

  if (!student) {
    return (
      <div className="container mt-5">
        <h3>No Student Data Found</h3>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container my-4">

      <div className="card shadow p-4">

        <div className="text-center mb-4">
          <h2>STUDENT MANAGEMENT PORTAL</h2>
          <h4>Student Profile</h4>
          <hr />
        </div>

        <div className="row">

          <div className="col-md-3 text-center">

            <img
              src={student.photo || "https://via.placeholder.com/150"}
              alt="Student"
              className="img-thumbnail"
              style={{
                width: "150px",
                height: "180px",
                objectFit: "cover"
              }}
            />

          </div>

          <div className="col-md-9">

            <table className="table table-bordered">

              <tbody>

                <tr>
                  <th>Admission No</th>
                  <td>{student.admissionNumber}</td>
                </tr>

                <tr>
                  <th>Roll No</th>
                  <td>{student.rollNumber}</td>
                </tr>

                <tr>
                  <th>Name</th>
                  <td>{student.firstName} {student.lastName}</td>
                </tr>

                <tr>
                  <th>Class</th>
                  <td>{student.className} - {student.section}</td>
                </tr>

                <tr>
                  <th>Father Name</th>
                  <td>{student.fatherName}</td>
                </tr>

                <tr>
                  <th>Mother Name</th>
                  <td>{student.motherName}</td>
                </tr>

                <tr>
                  <th>Mobile</th>
                  <td>{student.mobile}</td>
                </tr>

                <tr>
                  <th>Address</th>
                  <td>{student.address}</td>
                </tr>

                <tr>
                  <th>Status</th>
                  <td>{student.status}</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={handlePrint}
          >
            <i className="bi bi-printer"></i> Print Profile
          </button>
        </div>

      </div>

    </div>
  );
}

export default StudentProfilePrint;