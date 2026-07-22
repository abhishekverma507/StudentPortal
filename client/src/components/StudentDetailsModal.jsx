function StudentDetailsModal({ student, onClose }) {
  console.log(student);

  if (!student) return null;

  return (
    <>
      
        

      <div
        className="modal fade show"
        style={{
          display: "block",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
      >
        <div className="modal-dialog modal-lg">

          <div className="modal-content">

            <div className="modal-header bg-primary text-white">

              <h5>Student Details</h5>

              <button
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>

            </div>

            <div className="modal-body">

  <div className="text-center mb-4">

    {student.photo ? (
      <img
        src={student.photo}
        alt={student.firstName}
        width="150"
        height="150"
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid #0d6efd",
        }}
      />
    ) : (
      <i className="bi bi-person-circle display-1 text-secondary"></i>
    )}

  </div>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <strong>Admission No:</strong><br />
                  {student.admissionNumber}
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Roll Number:</strong><br />
                  {student.rollNumber}
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Name:</strong><br />
                  {student.firstName} {student.lastName}
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Class:</strong><br />
                  {student.className}
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Section:</strong><br />
                  {student.section}
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Father Name:</strong><br />
                  {student.fatherName}
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Mother Name:</strong><br />
                  {student.motherName}
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Mobile:</strong><br />
                  {student.mobile}
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Gender:</strong><br />
                  {student.gender}
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Address:</strong><br />
                  {student.address}
                </div>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default StudentDetailsModal;