import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";
import {
  addStudent,
  updateStudent,
  getStudentById,
} from "../services/studentService";
import { toast } from "react-toastify";


function StudentAdmission() {

const navigate = useNavigate();
const { id } = useParams();

const [editingStudent, setEditingStudent] = useState(null);

useEffect(() => {

  if (id) {
    fetchStudent();
  }

}, [id]);

async function fetchStudent() {

  try {

    const response = await getStudentById(id);

    setEditingStudent(response.data.data);

  } catch (error) {

    console.log(error);

    toast.error("Unable to load student.");

  }

}

  async function handleSubmit(studentData) {

  try {

    if (id) {

      await updateStudent(id, studentData);

      toast.success("Student updated successfully!");

        } else {

        await addStudent(studentData);

        toast.success("Student added successfully!");

    }

    navigate("/students");

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Unable to save student."
    );

  }

}

  return (

    <div className="container-fluid">


      <div className="d-flex justify-content-between align-items-center mb-4">


        <div>

          <h2 className="fw-bold">
  {id ? "✏️ Update Student" : "🎓 Student Admission"}
</h2>

<p className="text-muted mb-0">
  {id
    ? "Update the student's information."
    : "Add a new student to the School ERP."}
</p>

        </div>



        <Link
          to="/students"
          className="btn btn-secondary"
        >

          <i className="bi bi-arrow-left me-2"></i>

          Back to Students

        </Link>


      </div>



      <div className="card shadow">


        <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
        {id ? "Update Student" : "Admission Form"}
        </h5>


        </div>



        <div className="card-body">


          <StudentForm
  onAddStudent={handleSubmit}
  editingStudent={editingStudent}
  setEditingStudent={setEditingStudent}
/>


        </div>


      </div>


    </div>

  );

}


export default StudentAdmission;