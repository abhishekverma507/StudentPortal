import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TeacherForm from "../components/TeacherForm";
import {
  addTeacher,
  updateTeacher,
  getTeacherById,
} from "../services/teacherService";
import { toast } from "react-toastify";

function TeacherAdmission() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    if (id) {
      fetchTeacher();
    }
  }, [id]);

  async function fetchTeacher() {
    try {

      const response = await getTeacherById(id);

      setEditingTeacher(response.data.data);

    } catch (error) {

      console.log(error);

      toast.error("Unable to load teacher.");

    }
  }

  async function handleSubmit(teacherData) {

    try {

      if (id) {

        await updateTeacher(id, teacherData);

        toast.success("Teacher updated successfully!");

      } else {

        console.log(teacherData);
        await addTeacher(teacherData);

        toast.success("Teacher added successfully!");

      }

      navigate("/teachers");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to save teacher."
      );

    }

  }

  return (

    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            {id ? "✏️ Update Teacher" : "👨‍🏫 Teacher Admission"}
          </h2>

          <p className="text-muted mb-0">
            {id
              ? "Update the teacher's information."
              : "Add a new teacher to the School ERP."}
          </p>

        </div>

        <Link
          to="/teachers"
          className="btn btn-secondary"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Teachers
        </Link>

      </div>

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h5 className="mb-0">
            {id ? "Update Teacher" : "Teacher Admission Form"}
          </h5>

        </div>

        <div className="card-body">

          <TeacherForm
            onAddTeacher={handleSubmit}
            editingTeacher={editingTeacher}
            setEditingTeacher={setEditingTeacher}
          />

        </div>

      </div>

    </div>

  );

}

export default TeacherAdmission;