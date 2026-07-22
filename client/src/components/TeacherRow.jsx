function TeacherRow({
  teacher,
  onDelete,
  onEdit,
  onView
}) {


  return (

    <tr>


      <td>
        {teacher.employeeId}
      </td>


      <td>
        {teacher.firstName} {teacher.lastName}
      </td>


      <td>
        {teacher.subject}
      </td>


      <td>
        {teacher.qualification}
      </td>


      <td>
        {teacher.experience} Years
      </td>


      <td>
        {teacher.mobile}
      </td>


      <td>
        {teacher.email}
      </td>


      <td>

        {
          teacher.status === "Active"

          ?

          <span className="badge bg-success">
            Active
          </span>

          :

          <span className="badge bg-secondary">
            Inactive
          </span>

        }

      </td>


      <td>


        <div className="btn-group">


          {/* View Button */}

          <button

            className="btn btn-sm btn-info text-white"

            onClick={() =>
              onView(teacher)
            }

          >

            <i className="bi bi-eye"></i>

          </button>



          {/* Edit Button */}

          <button

            className="btn btn-sm btn-warning"

            onClick={() =>
              onEdit(teacher)
            }

          >

            <i className="bi bi-pencil-square"></i>

          </button>



          {/* Delete Button */}

          <button

            className="btn btn-sm btn-danger"

            onClick={() =>
              onDelete(teacher._id)
            }

          >

            <i className="bi bi-trash"></i>

          </button>


        </div>


      </td>


    </tr>

  );

}


export default TeacherRow;