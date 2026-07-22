import StudentRow from "./StudentRow";
import { Link } from "react-router-dom";

function StudentTable({
    students,
    onDelete,
    onEdit,
    onView,
    onPrint
})

{
  return (
    <div className="card shadow-sm mt-4">

      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">
          Student List ({students.length})
        </h5>
      </div>

      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-primary">

              <tr>
                <th>Photo</th>
                <th>Admission No</th>
                <th>Roll No</th>
                <th>Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Mobile</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>


            </thead>

               

            <tbody>

{students.length === 0 ? (

<tr>
  <td colSpan="10">
    <div className="alert alert-warning text-center mb-0">
      No students found.
    </div>
  </td>
</tr>

) : (

students.map((student) => (

<StudentRow
    key={student._id}
    student={student}
    onDelete={onDelete}
    onEdit={onEdit}
    onView={onView}
    onPrint={onPrint}
/>

))

)}

</tbody>

            

          </table>

        </div>

      </div>

    </div>
  );
}

export default StudentTable;