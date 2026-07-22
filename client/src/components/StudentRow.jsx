import { Link, useNavigate } from "react-router-dom";



function StudentRow({
    student,
    onDelete,
    onEdit,
    onView,
    onPrint
})
{

const navigate = useNavigate();
  return (
    <tr>
      <td>
  {student.photo ? (
    <img
      src={student.photo}
      alt="Student"
      width="50"
      height="50"
      style={{
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  ) : (
    <i className="bi bi-person-circle fs-3"></i>
  )}
</td>
      <td>{student.admissionNumber}</td>
      <td>{student.rollNumber}</td>
      <td>{student.firstName} {student.lastName}</td>
      <td>{student.className}</td>
      <td>{student.section}</td>
      <td>{student.mobile}</td>
      

      <td>
        <span
  className={`badge ${
    student.status === "Active"
      ? "bg-success"
      : student.status === "Inactive"
      ? "bg-danger"
      : student.status === "Suspended"
      ? "bg-warning text-dark"
      : student.status === "Transferred"
      ? "bg-primary"
      : "bg-secondary"
  }`}
>
  {student.status}
</span>
      </td>

    

      <td className="text-center">
    <div className="d-flex justify-content-center gap-2">

        <button
            className="btn btn-info btn-sm"
            title="View"
            onClick={() => onView(student)}
        >
            <i className="bi bi-eye"></i>
        </button>

        <button
            className="btn btn-warning btn-sm"
            title="Edit"
            onClick={() => onEdit(student)}
        >
            <i className="bi bi-pencil"></i>
        </button>

        <button
            className="btn btn-success btn-sm"
            title="Print"
            onClick={() => onPrint(student)}
        >
            <i className="bi bi-printer"></i>
        </button>

        <button
            className="btn btn-danger btn-sm"
            title="Delete"
            onClick={() => onDelete(student._id)}
        >
            <i className="bi bi-trash"></i>
        </button>

        <button
    className="btn btn-success btn-sm me-2"
    onClick={() => navigate(`/fees/student/${student._id}`)}
>
    <i className="bi bi-cash-coin"></i>
</button>

    </div>
</td>

    </tr>
  );
}

export default StudentRow;