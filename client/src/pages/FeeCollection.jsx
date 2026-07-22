import { useEffect, useState } from "react";
import axios from "axios";
import FeeHistory from "../components/FeeHistory";  
import { Link } from "react-router-dom";   
import API_URL from "../config/api";

function FeeCollection() {

  const [students, setStudents] = useState([]);

  const [fees, setFees] = useState([]);

  const [formData, setFormData] = useState({

    studentId: "",
    month: "",
    year: new Date().getFullYear(),
    totalFee: "",
    paidAmount: "",
    dueAmount: "",
    paymentMode: "Cash",
    receiptNumber: "",
    remarks: "",
    status: "Pending",
  });

    useEffect(() => {

    loadStudents();

    loadFees();

}, []);

  async function loadStudents() {
    try {
      const response = await axios.get(
        `${API_URL}/students`
      );

      setStudents(response.data.data);

    } catch (error) {
      console.log(error);
    }
  }

async function loadFees() {

    try {

        const response = await axios.get(
            `${API_URL}/fees`
        );

        setFees(response.data.data);
        const nextNumber = response.data.data.length + 1;

        setFormData((prev) => ({
        ...prev,
        receiptNumber: `RCP${String(nextNumber).padStart(6, "0")}`,
        }));

    }
    catch(error){

        console.log(error);

    }

}

  function handleChange(e) {

    const { name, value } = e.target;

    let updatedForm = {
      ...formData,
      [name]: value,
    };

    if (
      name === "totalFee" ||
      name === "paidAmount"
    ) {

      const total =
        Number(
          name === "totalFee"
            ? value
            : updatedForm.totalFee
        );

      const paid =
        Number(
          name === "paidAmount"
            ? value
            : updatedForm.paidAmount
        );

      updatedForm.dueAmount = total - paid;

      if (paid === 0)
        updatedForm.status = "Pending";
      else if (paid < total)
        updatedForm.status = "Partial";
      else
        updatedForm.status = "Paid";
    }

    setFormData(updatedForm);
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await axios.post(
  `${API_URL}/fees`,
  formData
);

alert("Fee collected successfully.");

// Refresh Fee History
await loadFees();

// Clear the form
setFormData({
  studentId: "",
  month: "",
  year: new Date().getFullYear(),
  totalFee: "",
  paidAmount: "",
  dueAmount: "",
  paymentMode: "Cash",
  receiptNumber: "",
  remarks: "",
  status: "Pending",
});

    } catch (error) {
      console.log(error);
    }
  }

  return (

<div className="container-fluid">

<div className="d-flex justify-content-between align-items-center mb-4">

<div>

<h2 className="fw-bold">
💰 Fee Collection
</h2>

<p className="text-muted mb-0">
Manage fee payments and receipts.
</p>

</div>

<Link
  to="/fees/new"
  className="btn btn-primary px-4"
>
  <i className="bi bi-plus-circle me-2"></i>
  Collect Fee
</Link>

</div>

<form onSubmit={handleSubmit}>

...
...
...

</form>

<FeeHistory fees={fees}/>

</div>

);
}

export default FeeCollection;