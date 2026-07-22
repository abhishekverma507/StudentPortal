import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/api";

function StudentFeeProfile() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [student, setStudent] = useState(null);
    const [fees, setFees] = useState([]);

    useEffect(() => {
        loadStudent();
        loadFees();
    }, []);

    function handleCollectFee() {
    navigate(`/fee-admission/${student._id}`);
    const handleCollectFee = () => {
    navigate(`/fees/new/${student._id}`);
};
}

    async function loadStudent() {

        const res = await axios.get(
            `${API_URL}/students/${id}`
        );

        setStudent(res.data.data);
    }

    async function loadFees() {

        const res = await axios.get(
            `${API_URL}/fees`
        );

        const studentFees = res.data.data.filter(
            fee => fee.studentId === id
        );

        setFees(studentFees);
    }

    if (!student) return <h4>Loading...</h4>;

    const totalPaid = fees.reduce(
        (sum, fee) => sum + Number(fee.paidAmount),
        0
    );

    const annualFee = Number(student.totalFee || 0);

    const remaining = annualFee - totalPaid;

    return (

<div className="container-fluid">

<div className="d-flex justify-content-between align-items-center mb-4">

    <div>
        <h2 className="fw-bold">
            💰 Student Fee Profile
        </h2>

        <p className="text-muted mb-0">
            Complete Fee Details
        </p>
    </div>

    <div>
<div className="d-flex align-items-center">

    <button
        className="btn btn-primary me-2"
        onClick={handleCollectFee}
    >
        <i className="bi bi-cash-coin me-2"></i>
        Collect Fee
    </button>

    <button
        className="btn btn-secondary"
        onClick={() => navigate("/fees")}
    >
        <i className="bi bi-arrow-left me-2"></i>
        Back
    </button>

</div>
    </div>

</div>

<div className="row">

<div className="col-md-4">

<div className="card shadow">

<div className="card-body text-center">

<img
src={
student.photo ||
"https://via.placeholder.com/150"
}
className="rounded-circle mb-3"
width="150"
/>

<h4>

{student.firstName} {student.lastName}

</h4>

<hr/>

<p>

<b>Admission :</b>

{student.admissionNumber}

</p>

<p>

<b>Class :</b>

{student.className}

</p>

<p>

<b>Section :</b>

{student.section}

</p>

<p>

<b>Father :</b>

{student.fatherName}

</p>

<p>

<b>Mobile :</b>

{student.mobile}

</p>

</div>

</div>

</div>

<div className="col-md-8">

<div className="row">

<div className="col-md-4">

<div className="card text-center shadow">

<div className="card-body">

<h6>

Annual Fee

</h6>

<h3>

₹ {annualFee}

</h3>

</div>

</div>

</div>

<div className="col-md-4">

<div className="card text-center shadow">

<div className="card-body">

<h6>

Collected

</h6>

<h3>

₹ {totalPaid}

</h3>

</div>

</div>

</div>

<div className="col-md-4">

<div className="card text-center shadow">

<div className="card-body">

<h6>

Remaining

</h6>

<h3 className="text-danger">

₹ {remaining}

</h3>

</div>

</div>

</div>

</div>

<div className="card mt-4 shadow">

<div className="card-header">

Payment History

</div>

<div className="card-body">

<table className="table">

<thead>

<tr>

<th>Receipt</th>

<th>Date</th>

<th>Paid</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{

fees.map(fee=>(

<tr key={fee._id}>

<td>

{fee.receiptNumber}

</td>

<td>

{fee.paymentDate}

</td>

<td>

₹ {fee.paidAmount}

</td>

<td>

{fee.status}

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

</div>

</div>

    
</div>

);

}

export default StudentFeeProfile;