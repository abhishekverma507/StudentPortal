import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/print.css";
import API_URL from "../config/api";

function PrintAllStudents() {

    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");

    useEffect(() => {
        loadStudents();
    }, []);

    async function loadStudents() {

        const response = await axios.get(
            `${API_URL}/students`
        );

        setStudents(response.data.data);

    }

    function handlePrint() {

        window.print();

    }

    const filteredStudents = students.filter((student) => {

    const classMatch =
        selectedClass === ""
            ? true
            : student.className === selectedClass;

    const sectionMatch =
        selectedSection === ""
            ? true
            : student.section === selectedSection;

    return classMatch && sectionMatch;

});
    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">

                <h2>
                    Student Register
                </h2>

               
<div className="row mb-4 no-print">

    <div className="col-md-4">

        <select
            className="form-select"
            value={selectedClass}
            onChange={(e) =>
                setSelectedClass(e.target.value)
            }
        >
            <option value="">All Classes</option>

            {[...new Set(students.map(s => s.className))].map((cls) => (

                <option key={cls} value={cls}>
                    {cls}
                </option>

            ))}

        </select>

    </div>

    <div className="col-md-4">

        <select
            className="form-select"
            value={selectedSection}
            onChange={(e) =>
                setSelectedSection(e.target.value)
            }
        >
            <option value="">All Sections</option>

            {[...new Set(students.map(s => s.section))].map((sec) => (

                <option key={sec} value={sec}>
                    {sec}
                </option>

            ))}

        </select>

    </div>

    <div className="col-md-4">

        <button
            className="btn btn-primary w-100"
            onClick={() => window.print()}
        >
            <i className="bi bi-printer me-2"></i>
            Print Register
        </button>

    </div>

</div>

            </div>

            <div className="text-center mb-4">

    <img
        src="/school-logo.png"
        alt="School Logo"
        width="90"
        className="mb-2"
    />

    <h2 className="fw-bold mb-1">
        ABC Public School
    </h2>

    <h5 className="text-muted">
        Student Register
    </h5>

    <hr />

    <div className="d-flex justify-content-between mb-3">

    <div>
        <strong>Total Students :</strong> {filteredStudents.length}
    </div>

    <div>
        <strong>Date :</strong>{" "}
        {new Date().toLocaleDateString()}
    </div>

</div>

</div>

            <table className="table table-bordered table-striped table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>#</th>
                        <th>Photo</th>
                        <th>Admission No</th>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Father</th>
                        <th>Mobile</th>
                        

                    </tr>

                </thead>

                <tbody>

                    {filteredStudents.map((student,index)=> (
                        

                        <tr key={student._id}>

                           <td>{index + 1}</td>

                            <td>

                                {student.photo ? (

                                    <img
                                        src={student.photo}
                                        width="45"
                                        height="45"
                                        style={{
                                            borderRadius: "50%",
                                            objectFit: "cover"
                                        }}
                                    />

                                ) : "-"}

                            </td>

                            <td>{student.admissionNumber}</td>

                            <td>
                                {student.firstName} {student.lastName}
                            </td>

                            <td>{student.rollNumber}</td>

                            <td>{student.className}</td>

                            <td>{student.section}</td>

                            <td>{student.fatherName}</td>

                            <td>{student.mobile}</td>


                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default PrintAllStudents;