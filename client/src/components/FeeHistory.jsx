import { useFees } from "../context/FeeContext";
import { useState } from "react";
import FeeDetailsModal from "./FeeDetailsModal";
import FeeReceipt from "./FeeReceipt";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import * as XLSX from "xlsx";



function FeeHistory({ onEdit, studentId }) {

  function exportToExcel() {

    const data = fees.map((fee) => ({

        ReceiptNo: fee.receiptNo,

        Student: fee.studentName,

        AdmissionNo: fee.admissionNo,

        Class: fee.className,

        Month: fee.month,

        Year: fee.year,

        TotalFee: fee.totalFee,

        PaidAmount: fee.paidAmount,

        DueAmount: fee.dueAmount,

        PaymentMode: fee.paymentMode,

        Status: fee.status,

        Date: fee.paymentDate,

    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Fees"
    );

    XLSX.writeFile(workbook, "FeeHistory.xlsx");
}

function handleImport(event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {

        const workbook = XLSX.read(
            e.target.result,
            {
                type: "binary",
            }
        );

        const sheet =
            workbook.Sheets[
                workbook.SheetNames[0]
            ];

        const importedData =
            XLSX.utils.sheet_to_json(sheet);

        importedData.forEach((fee) => {
            addFee(fee);
        });

        alert("Fee records imported successfully.");
    };

    reader.readAsBinaryString(file);
}


  const [selectedFee,setSelectedFee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState("newest");
const [statusFilter, setStatusFilter] = useState("All");
    const {
        fees,
        deleteFee,
        addFee
    } = useFees();

const navigate = useNavigate();
const filteredFees = fees
  .filter((fee) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (fee.receiptNo || fee.receiptNumber || "")
        .toLowerCase()
        .includes(search) ||
      (fee.studentName || "")
        .toLowerCase()
        .includes(search) ||
      (fee.admissionNo || "")
        .toLowerCase()
        .includes(search);

    const matchesStatus =
      statusFilter === "All"
        ? true
        : fee.status === statusFilter;

    return matchesSearch && matchesStatus;
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.paymentDate) - new Date(b.paymentDate);

      case "highest":
        return b.finalAmount - a.finalAmount;

      case "lowest":
        return a.finalAmount - b.finalAmount;

      case "student":
        return (a.studentName || "").localeCompare(
          b.studentName || ""
        );

      default:
        return new Date(b.paymentDate) - new Date(a.paymentDate);
    }
  });
   const studentFees = studentId
    ? fees.filter((fee) => fee.studentId === studentId)
    : fees;
    return (

        <div className="card shadow mt-4">


            <div className="card-header bg-dark text-white">

                <h5 className="mb-0">

                <i className="bi bi-clock-history"></i>
                {" "}
                Fee History

                </h5>

            </div>



            <div className="card-body">


                <div className="row mb-3">

  <div className="col-md-4">
    <input
      type="text"
      className="form-control"
      placeholder="Search Receipt / Student / Admission No"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <select
      className="form-select"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="highest">Highest Amount</option>
      <option value="lowest">Lowest Amount</option>
      <option value="student">Student Name</option>
    </select>
  </div>

  <div className="col-md-4">
    <select
      className="form-select"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="All">All Status</option>
      <option value="Paid">Paid</option>
      <option value="Pending">Pending</option>
      <option value="Partial">Partial</option>
    </select>
  </div>

</div>


<div className="d-flex justify-content-end mb-3">

    <input
        type="file"
        id="feeImport"
        accept=".xlsx,.xls"
        style={{ display: "none" }}
        onChange={handleImport}
    />

    <button
        className="btn btn-outline-success me-2"
        onClick={() =>
            document.getElementById("feeImport").click()
        }
    >
        <i className="bi bi-upload me-2"></i>
        Import Excel
    </button>

    <button
        className="btn btn-success"
        onClick={exportToExcel}
    >
        <i className="bi bi-file-earmark-excel me-2"></i>
        Export Excel
    </button>

</div>

                {fees.length === 0 ? (

                    <p className="text-center text-muted">
                        No Fee Records Found
                    </p>


                ) : (

                      


                <div className="table-responsive">

                    

                <table className="table table-bordered table-hover">


                <thead className="table-primary">

                <tr>

                <th>Receipt No</th>
                <th>Student</th>
                <th>Admission No</th>
                <th>Class</th>
                <th>Fee Type</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Action</th>

                </tr>

                </thead>



                <tbody>


  

                {
                    
                filteredFees.map((fee) => (

                <tr key={fee._id}>


                <td>
                {fee.receiptNo}
                </td>


                <td>
                {fee.studentName}
                </td>


                <td>
                {fee.admissionNo}
                </td>


                <td>
                {fee.className}
                -
                {fee.section}
                </td>


                <td>
                {fee.feeType}
                </td>


                <td>
                ₹ {fee.finalAmount}
                </td>


                <td>
                {fee.paymentMode}
                </td>


                <td>
                {fee.paymentDate}
                </td>


                <td style={{ whiteSpace: "nowrap" }}>

                  <button

className="btn btn-info btn-sm me-2"

onClick={()=>setSelectedFee(fee)}

>

<i className="bi bi-eye"></i>

</button>


                <Link
    to={`/fees/edit/${fee._id}`}
    className="btn btn-warning btn-sm me-2"
>
    <i className="bi bi-pencil"></i>
            </Link>



                <button

                className="btn btn-danger btn-sm me-2"

                onClick={()=>deleteFee(fee._id)}

                >

                <i className="bi bi-trash"></i>

                </button>



                <button

className="btn btn-success btn-sm"

onClick={()=>

navigate("/fee-receipt",{
state:fee
})

}

>

<i className="bi bi-printer"></i>

</button>




                </td>


                </tr>

                ))
                }


                </tbody>


                </table>


                </div>


                )}


            </div>


                  {
selectedFee &&

<FeeDetailsModal

fee={selectedFee}

onClose={()=>setSelectedFee(null)}

/>



}

        </div>

    );


}


export default FeeHistory;