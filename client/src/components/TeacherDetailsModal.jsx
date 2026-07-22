function TeacherDetailsModal({
  teacher,
  onClose
}) {


  if (!teacher) return null;


  return (

    <>

      {/* Modal Background */}

      <div
        className="modal fade show"
        style={{
          display: "block",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
      >

        <div className="modal-dialog modal-lg">


          <div className="modal-content">


            {/* Header */}

            <div className="modal-header bg-primary text-white">

              <h5 className="modal-title">

                Teacher Details

              </h5>


              <button

                type="button"

                className="btn-close btn-close-white"

                onClick={onClose}

              ></button>


            </div>



            {/* Body */}

            <div className="modal-body">


              <div className="row">


                {/* Photo */}

                <div className="col-md-4 text-center mb-3">


                  {
                    teacher.photo ?

                    <img

                      src={teacher.photo}

                      alt="Teacher"

                      className="img-thumbnail"

                      style={{
                        width:"180px",
                        height:"180px",
                        objectFit:"cover"
                      }}

                    />

                    :

                    <div

                      className="border rounded d-flex align-items-center justify-content-center"

                      style={{
                        width:"180px",
                        height:"180px",
                        margin:"auto"
                      }}

                    >

                      No Photo

                    </div>

                  }


                </div>




                {/* Details */}

                <div className="col-md-8">


                  <table className="table table-bordered">


                    <tbody>


                      <tr>

                        <th>
                          Employee ID
                        </th>

                        <td>
                          {teacher.employeeId}
                        </td>

                      </tr>



                      <tr>

                        <th>
                          Name
                        </th>

                        <td>
                          {teacher.firstName} {teacher.lastName}
                        </td>

                      </tr>



                      <tr>

                        <th>
                          Subject
                        </th>

                        <td>
                          {teacher.subject}
                        </td>

                      </tr>



                      <tr>

                        <th>
                          Qualification
                        </th>

                        <td>
                          {teacher.qualification}
                        </td>

                      </tr>



                      <tr>

                        <th>
                          Experience
                        </th>

                        <td>
                          {teacher.experience} Years
                        </td>

                      </tr>

                      <tr>

  <th>Joining Date</th>

  <td>
    {teacher.joiningDate
      ? new Date(teacher.joiningDate).toLocaleDateString("en-IN")
      : "-"}
  </td>
</tr>



                      <tr>

                        <th>
                          Gender
                        </th>

                        <td>
                          {teacher.gender}
                        </td>

                      </tr>



                      <tr>

                        <th>
                          Mobile
                        </th>

                        <td>
                          {teacher.mobile}
                        </td>

                      </tr>



                      <tr>

                        <th>
                          Email
                        </th>

                        <td>
                          {teacher.email}
                        </td>

                      </tr>



                      <tr>

                        <th>
                          Status
                        </th>

                        <td>

                          {
                            teacher.status
                          }

                        </td>

                      </tr>



                      <tr>

                        <th>
                          Address
                        </th>

                        <td>
                          {teacher.address}
                        </td>

                      </tr>

<tr>
  <th>Created On</th>

  <td>
    {teacher.createdAt
      ? new Date(teacher.createdAt).toLocaleDateString("en-IN")
      : "-"}
  </td>
</tr>

                    </tbody>


                  </table>


                </div>


              </div>


            </div>




            {/* Footer */}

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


export default TeacherDetailsModal;