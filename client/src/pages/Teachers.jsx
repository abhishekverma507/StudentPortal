import { useState, useEffect, useRef } from "react";
import TeacherForm from "../components/TeacherForm";
import TeacherTable from "../components/TeacherTable";
import SearchBar from "../components/SearchBar";
import TeacherDetailsModal from "../components/TeacherDetailsModal";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher as deleteTeacherAPI,
} from "../services/teacherService";

function Teachers() {

  const [teachers, setTeachers] = useState([]);

  const fileInputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortBy, setSortBy] = useState("employeeId");

  const [sortOrder, setSortOrder] = useState("asc");

  const [editingTeacher, setEditingTeacher] = useState(null);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const teachersPerPage = 5;

  async function fetchTeachers() {

    try {

      const response = await getTeachers();

      setTeachers(response.data.data);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load teachers.");

    }

  }

  useEffect(() => {

    fetchTeachers();

  }, []);

  async function addOrUpdateTeacher(teacherData) {

    try {

      if (editingTeacher) {

        await updateTeacher(
          editingTeacher._id,
          teacherData
        );

        toast.success("Teacher updated successfully!");

        setEditingTeacher(null);

      } else {

        await addTeacher(teacherData);

        toast.success("Teacher added successfully!");

      }

      await fetchTeachers();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to save teacher."
      );

    }

  }

  async function deleteTeacher(id) {

    if (!window.confirm("Delete this teacher?"))
      return;

    try {

      await deleteTeacherAPI(id);

      toast.success("Teacher deleted successfully!");

      await fetchTeachers();

    } catch (error) {

      console.error(error);

      toast.error("Unable to delete teacher.");

    }

  }

  const navigate = useNavigate();

function editTeacher(teacher) {
  navigate(`/teachers/edit/${teacher._id}`);
}

  function viewTeacher(teacher) {

    setSelectedTeacher(teacher);

  }

  function exportToExcel() {

    const data = sortedTeachers.map((teacher) => ({

      "Employee ID": teacher.employeeId,

      "First Name": teacher.firstName,

      "Last Name": teacher.lastName,

      Subject: teacher.subject,

      Qualification: teacher.qualification,

      Experience: teacher.experience,

      Mobile: teacher.mobile,

      Email: teacher.email,

      Gender: teacher.gender,

      Status: teacher.status,

    }));

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Teachers"
    );

    XLSX.writeFile(
      workbook,
      "teachers.xlsx"
    );

  }

  function handleImport(e) {

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {

    const workbook = XLSX.read(event.target.result, {
      type: "binary",
    });

    const worksheet =
      workbook.Sheets[workbook.SheetNames[0]];

    const data =
      XLSX.utils.sheet_to_json(worksheet);

    console.log(data);

    toast.success("Excel imported successfully.");

  };

  reader.readAsBinaryString(file);

}

  const filteredTeachers = teachers.filter(
    (teacher) => {

      const search =
        searchTerm.toLowerCase();

      return (

        String(teacher.employeeId || "")
          .toLowerCase()
          .includes(search) ||

        String(teacher.firstName || "")
          .toLowerCase()
          .includes(search) ||

        String(teacher.lastName || "")
          .toLowerCase()
          .includes(search) ||

        String(teacher.subject || "")
          .toLowerCase()
          .includes(search) ||

        String(teacher.mobile || "")
          .toLowerCase()
          .includes(search) ||

        String(teacher.email || "")
          .toLowerCase()
          .includes(search) ||

        String(teacher.status || "")
          .toLowerCase()
          .includes(search)

      );

    }
  );

  const sortedTeachers = [...filteredTeachers].sort(
    (a, b) => {

      let valueA =
        String(a[sortBy] || "").toLowerCase();

      let valueB =
        String(b[sortBy] || "").toLowerCase();

      if (sortOrder === "asc") {

        return valueA.localeCompare(
          valueB,
          undefined,
          { numeric: true }
        );

      }

      return valueB.localeCompare(
        valueA,
        undefined,
        { numeric: true }
      );

    }
  );

  const indexOfLastTeacher =
    currentPage * teachersPerPage;

  const indexOfFirstTeacher =
    indexOfLastTeacher - teachersPerPage;

  const currentTeachers =
    sortedTeachers.slice(
      indexOfFirstTeacher,
      indexOfLastTeacher
    );

  const totalPages =
    Math.ceil(
      sortedTeachers.length /
      teachersPerPage
    );

      return (

        

    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

  <div>

    <h2 className="fw-bold mb-1">
      👨‍🏫 Teacher Management
    </h2>

    <p className="text-muted mb-0">
      Manage teachers and staff records.
    </p>

  </div>

  <Link
    to="/teachers/new"
    className="btn btn-primary px-4"
  >
    <i className="bi bi-person-plus-fill me-2"></i>
    Add Teacher
  </Link>

</div>


      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="d-flex justify-content-end mb-3">

  <button
    className="btn btn-outline-success me-2"
    onClick={() => fileInputRef.current?.click()}
  >
    <i className="bi bi-upload me-2"></i>
    Import Excel
  </button>

  <input
    type="file"
    ref={fileInputRef}
    accept=".xlsx,.xls"
    style={{ display: "none" }}
    onChange={handleImport}
  />

  <button
    className="btn btn-success"
    onClick={exportToExcel}
  >
    <i className="bi bi-file-earmark-excel me-2"></i>
    Export Excel
  </button>

</div>

      <div className="row mb-3">

        <div className="col-md-6">

          <select
            className="form-select"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="employeeId">
              Employee ID
            </option>

            <option value="firstName">
              First Name
            </option>

            <option value="subject">
              Subject
            </option>

            <option value="qualification">
              Qualification
            </option>

            <option value="experience">
              Experience
            </option>

            <option value="status">
              Status
            </option>

          </select>

        </div>

        <div className="col-md-6">

          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value)
            }
          >
            <option value="asc">
              Ascending
            </option>

            <option value="desc">
              Descending
            </option>

          </select>

        </div>

      </div>

      <TeacherTable
        teachers={currentTeachers}
        onDelete={deleteTeacher}
        onEdit={editTeacher}
        onView={viewTeacher}
      />

            {/* Pagination */}

      <nav className="mt-4">

        <ul className="pagination justify-content-center">

          <li
            className={`page-item ${
              currentPage === 1 ? "disabled" : ""
            }`}
          >

            <button
              className="page-link"
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
            >
              Previous
            </button>

          </li>


          {
            Array.from(
              { length: totalPages },
              (_, index) => (

                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1
                      ? "active"
                      : ""
                  }`}
                >

                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                  >
                    {index + 1}
                  </button>

                </li>

              )
            )
          }


          <li
            className={`page-item ${
              currentPage === totalPages ||
              totalPages === 0
                ? "disabled"
                : ""
            }`}
          >

            <button
              className="page-link"
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
            >
              Next
            </button>

          </li>

        </ul>

      </nav>


      {/* Teacher Details Modal */}

      {
        selectedTeacher && (

          <TeacherDetailsModal

            teacher={selectedTeacher}

            onClose={() =>
              setSelectedTeacher(null)
            }

          />

        )
      }


    </div>
  );

}


export default Teachers;     


