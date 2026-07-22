import { useState, useEffect, useRef } from "react";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import SearchBar from "../components/SearchBar";
import StudentDetailsModal from "../components/StudentDetailsModal";
import { useStudents } from "../context/StudentContext";
import * as XLSX from "xlsx";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent as deleteStudentAPI,
} from "../services/studentService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Students() {
const { students, setStudents } = useStudents();  
const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState("admissionNumber");
const [sortOrder, setSortOrder] = useState("asc");
const [editingStudent, setEditingStudent] = useState(null);
const [showForm, setShowForm] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const studentsPerPage = 5;
const [selectedStudent, setSelectedStudent] = useState(null);
const navigate = useNavigate();
const fileInputRef = useRef(null);



async function fetchStudents() {
  try {
    const response = await getStudents();
    setStudents(response.data.data);
  } catch (error) {
    console.error(error);

    toast.error("Unable to load students.");
  }
}

 useEffect(() => {
  fetchStudents();
}, []);

useEffect(() => {
  setCurrentPage(1);
}, [searchTerm]);

useEffect(() => {
  setCurrentPage(1);
}, [sortBy, sortOrder]);

async function addOrUpdateStudent(studentData) {
  try {
    if (editingStudent) {
      await updateStudent(editingStudent._id, studentData);

      toast.success("Student updated successfully!");

      setEditingStudent(null);
    } else {
      await addStudent(studentData);

      toast.success("Student added successfully!");
    }

    await fetchStudents();
    setShowForm(false);

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Unable to save student."
    );
  }
}

  async function deleteStudent(id) {
  if (!window.confirm("Delete this student?")) return;

  try {
    await deleteStudentAPI(id);
    await fetchStudents();
    toast.success("Student deleted successfully!");
  } catch (error) {
  console.error(error);

  toast.error(
    error.response?.data?.message ||
    "Unable to delete student."
  );
}
}

  function editStudent(student) {
  navigate(`/students/edit/${student._id}`);
}

   function viewStudent(student) {
    setSelectedStudent(student);
  }

function exportToExcel() {

  const data = sortedStudents.map((student) => ({
    "Admission No": student.admissionNumber,
    "Roll No": student.rollNumber,
    "First Name": student.firstName,
    "Last Name": student.lastName,
    "Class": student.className,
    "Section": student.section,
    "Mobile": student.mobile,
    "Gender": student.gender,
    "Status": student.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Students"
  );

  XLSX.writeFile(workbook, "students.xlsx");
}

function handleImport(e) {

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {

    const data = event.target.result;

    const workbook = XLSX.read(data, {
      type: "binary",
    });

    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    const excelData = XLSX.utils.sheet_to_json(
      worksheet
    );

    console.log(excelData);

  };

  reader.readAsBinaryString(file);

}

const filteredStudents = students.filter((student) => {
const search = searchTerm.toLowerCase();

  return (
  String(student.admissionNumber || "").toLowerCase().includes(search) ||
  String(student.rollNumber || "").toLowerCase().includes(search) ||
  String(student.firstName || "").toLowerCase().includes(search) ||
  String(student.lastName || "").toLowerCase().includes(search) ||
  String(student.mobile || "").toLowerCase().includes(search) ||
  String(student.className || "").toLowerCase().includes(search) ||
  String(student.section || "").toLowerCase().includes(search) ||
  String(student.fatherName || "").toLowerCase().includes(search) ||
  String(student.motherName || "").toLowerCase().includes(search) ||
  String(student.status || "").toLowerCase().includes(search)
  );
});

const sortedStudents = [...filteredStudents].sort((a, b) => {

  let valueA = String(a[sortBy] || "").toLowerCase();
  let valueB = String(b[sortBy] || "").toLowerCase();

  if (sortOrder === "asc") {
    return valueA.localeCompare(valueB, undefined, { numeric: true });
  }

  return valueB.localeCompare(valueA, undefined, { numeric: true });

});

      // Pagination
const indexOfLastStudent = currentPage * studentsPerPage;
const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

const currentStudents = sortedStudents.slice(
  indexOfFirstStudent,
  indexOfLastStudent
);

const totalPages = Math.ceil(
  sortedStudents.length / studentsPerPage
);

const handlePrint = (student) => {
  navigate("/student-profile", {
    state: student,
  });
};

  return (


    <div className="container-fluid">

  <div className="d-flex justify-content-between align-items-center mb-4">

  <div>

    <h2 className="fw-bold mb-1">
      🎓 Student Management
    </h2>

    <p className="text-muted mb-0">
      Manage admissions and student records.
    </p>

  </div>

  <Link
    to="/students/add"
    className="btn btn-primary px-4"
  >
    <i className="bi bi-person-plus-fill me-2"></i>
    Add Student
  </Link>

</div>

      <div className="card shadow-sm mb-4">

  <div className="card-body">

    <div className="row align-items-center">

      <div className="col-md-6">

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

      </div>

      <div className="col-md-6 text-end">

        <button
  className="btn btn-outline-success me-2"
  onClick={() => {
    console.log(fileInputRef.current);
    fileInputRef.current?.click();
  }}
>
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

    <div className="d-flex justify-content-end mb-4"></div>

      <button
        className="btn btn-outline-primary me-2"
        onClick={() => navigate("/students/print-all")}
    >
        <i className="bi bi-printer me-2"></i>
        Print 
    </button>
    

      </div>

    </div>

  </div>

</div>

        <div className="row mb-3">

  <div className="col-md-6">

    <select
      className="form-select"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    > 
      <option value="rollNumber">Roll Number</option>
      <option value="admissionNumber">Admission Number</option>
      <option value="mobile">Mobile</option>
      <option value="firstName">First Name</option>
      <option value="className">Class</option>
    </select>

  </div>

  <div className="col-md-6">

    <select
      className="form-select"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>

  </div>

</div>

      <StudentTable
    students={currentStudents}
    onDelete={deleteStudent}
    onEdit={editStudent}
    onView={viewStudent}
    onPrint={handlePrint}
      />

      <div className="d-flex justify-content-center align-items-center mt-4">

  <button
    className="btn btn-secondary me-2"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Previous
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      className={`btn mx-1 ${
        currentPage === index + 1
          ? "btn-primary"
          : "btn-outline-primary"
      }`}
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </button>

  ))}

  <button
    className="btn btn-secondary ms-2"
    disabled={currentPage === totalPages || totalPages === 0}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>

  

</div>

{showForm && (

<div className="card shadow mt-4">

<div className="card-header bg-primary text-white">

<h5 className="mb-0">

{editingStudent
? "Update Student"
: "Add Student"}

</h5>

</div>

<div className="card-body">

<StudentForm
onAddStudent={addOrUpdateStudent}
editingStudent={editingStudent}
setEditingStudent={setEditingStudent}
/>

<div className="text-end mt-3">

<button
className="btn btn-secondary"
onClick={() => {
setShowForm(false);
setEditingStudent(null);
}}
>

Cancel

</button>


</div>

</div>

</div>

)}

{selectedStudent && (
    <StudentDetailsModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
    />
)}

    </div>



  );
}

export default Students;