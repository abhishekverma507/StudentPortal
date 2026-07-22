import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../services/studentService";

function PrintStudent() {

  const { id } = useParams();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
  }, []);

  async function fetchStudent() {
    try {

      const response = await getStudentById(id);

      setStudent(response.data.data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    if (student) {
      setTimeout(() => {
        window.print();
      }, 500);
    }

  }, [student]);

  if (!student) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container mt-4">

      <div className="text-center mb-4">

    <img
        src="/school-logo.png"
        alt="School Logo"
        width="90"
    />

    <h2 className="fw-bold mt-2">
        ABC PUBLIC SCHOOL
    </h2>

    <h5 className="text-secondary">
        STUDENT PROFILE
    </h5>

    <p className="mb-0">
        123 School Road, New Delhi
    </p>

    <small>
        Phone : +91-9876543210
    </small>

</div>

<hr />

      <div className="row">

        <div className="col-md-9">

          <h4>Student Details</h4>

          <table className="table table-bordered">

<tbody>

<tr>
<td><strong>Admission No</strong></td>
<td>{student.admissionNumber}</td>
</tr>

<tr>
<td><strong>Roll No</strong></td>
<td>{student.rollNumber}</td>
</tr>

<tr>
<td><strong>Student Name</strong></td>
<td>{student.firstName} {student.lastName}</td>
</tr>

<tr>
<td><strong>Class</strong></td>
<td>{student.className}</td>
</tr>

<tr>
<td><strong>Section</strong></td>
<td>{student.section}</td>
</tr>

<tr>
<td><strong>Gender</strong></td>
<td>{student.gender}</td>
</tr>

<tr>
<td><strong>Status</strong></td>
<td>{student.status}</td>
</tr>

<tr>
<td><strong>Father</strong></td>
<td>{student.fatherName}</td>
</tr>

<tr>
<td><strong>Mother</strong></td>
<td>{student.motherName}</td>
</tr>

<tr>
<td><strong>Mobile</strong></td>
<td>{student.mobile}</td>
</tr>

<tr>
<td><strong>Address</strong></td>
<td>{student.address}</td>
</tr>

</tbody>

</table>

    <div className="mt-3">

<strong>
Printed On :
</strong>

{new Date().toLocaleDateString()}

</div>

        </div>

        <div className="col-md-3 text-center">

          {student.photo && (
            <img
    src={student.photo}
    alt="Student"

    className="img-thumbnail"

    style={{
        width: "180px",
        height: "210px",
        objectFit: "cover"
    }}
/>
          )}

        </div>

      </div>

      <br />

      <br />

      <div className="row mt-5 text-center">

<div className="col-4">

____________________

<br/>

Parent Signature

</div>

<div className="col-4">

____________________

<br/>

Class Teacher

</div>

<div className="col-4">

____________________

<br/>

Principal

</div>

</div>

    </div>
  );
}

export default PrintStudent;