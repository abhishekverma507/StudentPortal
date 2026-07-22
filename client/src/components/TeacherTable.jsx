import TeacherRow from "./TeacherRow";

function TeacherTable({
  teachers,
  onDelete,
  onEdit,
  onView,
}) {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Teacher List</h5>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Status</th>
                <th width="180">Actions</th>
              </tr>
            </thead>

            <tbody>
              {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <TeacherRow
                    key={teacher._id}
                    teacher={teacher}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onView={onView}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeacherTable;