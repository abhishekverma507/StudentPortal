import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import FeeForm from "../components/FeeForm";
import FeeHistory from "../components/FeeHistory";
import { useFees } from "../context/FeeContext";
import API_URL from "../config/api";

function FeeAdmission() {

  const { studentId } = useParams();

  const [student, setStudent] = useState(null);

  const { addFee, updateFee } = useFees();

  const [editingFee, setEditingFee] = useState(null);

  useEffect(() => {

    if (studentId) {
      loadStudent();
    }

  }, [studentId]);

  async function loadStudent() {

    try {

      const response = await axios.get(
        `${API_URL}/students/${studentId}`
      );

      setStudent(response.data.data);

    } catch (error) {

      console.log(error);

    }

  }

  function handleAddFee(feeData) {

    if (editingFee) {

      updateFee({
        ...feeData,
        id: editingFee.id,
        receiptNo: editingFee.receiptNo,
      });

      setEditingFee(null);

    } else {

      addFee(feeData);

    }

  }

  return (

    <div className="container-fluid mt-4">

      {/* Student Card will come here */}

      <FeeHistory
        onEdit={setEditingFee}
        studentId={studentId}
      />

      {student && (

<div className="card shadow mb-4">

  <div className="card-header bg-info text-white">

    <h5 className="mb-0">
      Student Information
    </h5>

  </div>

  <div className="card-body">

    <div className="row">

      <div className="col-md-3 text-center">

        {student.photo ? (

          <img
            src={student.photo}
            className="img-thumbnail"
            style={{
              width: "170px",
              height: "170px",
              objectFit: "cover",
            }}
          />

        ) : (

          <div
            className="border rounded d-flex align-items-center justify-content-center"
            style={{
              width: "170px",
              height: "170px",
            }}
          >
            No Photo
          </div>

        )}

      </div>

      <div className="col-md-9">

        <h3>
          {student.firstName} {student.lastName}
        </h3>

        <hr />

        <div className="row">

          <div className="col-md-4">
            <strong>Admission No:</strong> {student.admissionNumber}
          </div>

          <div className="col-md-4">
            <strong>Roll No:</strong> {student.rollNumber}
          </div>

          <div className="col-md-4">
            <strong>Class:</strong> {student.className}
          </div>

          <div className="col-md-4 mt-2">
            <strong>Section:</strong> {student.section}
          </div>

          <div className="col-md-4 mt-2">
            <strong>Father:</strong> {student.fatherName}
          </div>

          <div className="col-md-4 mt-2">
            <strong>Mobile:</strong> {student.mobile}
          </div>

        </div>

      </div>

    </div>

  </div>

</div>

)}

      <FeeForm
        student={student}
        editingFee={editingFee}
        onAddFee={handleAddFee}
      />

    </div>

  );

}

export default FeeAdmission;