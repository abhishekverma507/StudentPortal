import { useEffect, useState } from "react";


function FeeForm({ onAddFee, editingFee, student }) {


  const [formData, setFormData] = useState({

    studentName: "",
    admissionNo: "",
    className: "",
    section: "",

    fatherName: "",
    mobile: "",

    feeType: "Tuition Fee",

    academicYear: "2026-27",

    totalAmount: "",
    discount: "0",
    finalAmount: "",

    paymentMode: "Cash",

    paymentDate: "",

    remarks: "",

    status: "Paid"

  });



  // Load data while editing
  useEffect(() => {

    if(editingFee){

      setFormData(editingFee);

    }

  },[editingFee]);


    useEffect(() => {

    if (!student) return;

    setFormData((prev) => ({

        ...prev,

        studentId: student._id,

        studentName: `${student.firstName} ${student.lastName}`,

        admissionNo: student.admissionNumber,

        rollNo: student.rollNumber,

        className: student.className,

        section: student.section,

        fatherName: student.fatherName,

        mobile: student.mobile,

    }));

}, [student]);


  // Handle input

  const handleChange = (e)=>{

    const {name,value}=e.target;


    setFormData(prev=>({

      ...prev,

      [name]:value


    }));

  };





  // Calculate final amount

  useEffect(()=>{


    const total =
    Number(formData.totalAmount) || 0;


    const discount =
    Number(formData.discount) || 0;


    setFormData(prev=>({

      ...prev,

      finalAmount:
      total - discount

    }));


  },[
    formData.totalAmount,
    formData.discount
  ]);







  const handleSubmit=(e)=>{

    e.preventDefault();


    if(!formData.studentName ||
       !formData.totalAmount){

      alert(
        "Student Name and Amount are required"
      );

      return;

    }



    onAddFee({

      ...formData

    });



    setFormData({

      studentName:"",
      admissionNo:"",
      className:"",
      section:"",
      fatherName:"",
      mobile:"",
      feeType:"Tuition Fee",
      academicYear:"2026-27",
      totalAmount:"",
      discount:"0",
      finalAmount:"",
      paymentMode:"Cash",
      paymentDate:"",
      remarks:"",
      status:"Paid"

    });


  };





return (

<div className="card shadow mb-4">


<div className="card-header bg-primary text-white">

<h5 className="mb-0">

<i className="bi bi-cash-stack"></i>
{" "}
{editingFee ? "Edit Fee" : "Fee Admission"}

</h5>

</div>



<div className="card-body">


<form onSubmit={handleSubmit}>


<div className="row">


<div className="col-md-4 mb-3">

<label>
Student Name
</label>

<input

className="form-control"

name="studentName"

value={formData.studentName}

onChange={handleChange}

/>

</div>



<div className="col-md-4 mb-3">

<label>
Admission No
</label>

<input

className="form-control"

name="admissionNo"

value={formData.admissionNo}

onChange={handleChange}

/>

</div>




<div className="col-md-4 mb-3">

<label>
Class
</label>

<input

className="form-control"

name="className"

value={formData.className}

onChange={handleChange}

/>

</div>



<div className="col-md-4 mb-3">

<label>
Section
</label>

<input

className="form-control"

name="section"

value={formData.section}

onChange={handleChange}

/>

</div>




<div className="col-md-4 mb-3">

<label>
Father Name
</label>

<input

className="form-control"

name="fatherName"

value={formData.fatherName}

onChange={handleChange}

/>

</div>




<div className="col-md-4 mb-3">

<label>
Mobile
</label>

<input

className="form-control"

name="mobile"

value={formData.mobile}

onChange={handleChange}

/>

</div>





<div className="col-md-4 mb-3">

<label>
Fee Type
</label>

<select

className="form-control"

name="feeType"

value={formData.feeType}

onChange={handleChange}

>


<option>Tuition Fee</option>
<option>Admission Fee</option>
<option>Exam Fee</option>
<option>Transport Fee</option>
<option>Other</option>


</select>

</div>





<div className="col-md-4 mb-3">

<label>
Academic Year
</label>

<input

className="form-control"

name="academicYear"

value={formData.academicYear}

onChange={handleChange}

/>

</div>





<div className="col-md-4 mb-3">

<label>
Payment Mode
</label>

<select

className="form-control"

name="paymentMode"

value={formData.paymentMode}

onChange={handleChange}

>

<option>Cash</option>
<option>Online</option>
<option>UPI</option>
<option>Cheque</option>
<option>Bank Transfer</option>


</select>

</div>






<div className="col-md-4 mb-3">

<label>
Total Amount
</label>

<input

type="number"

className="form-control"

name="totalAmount"

value={formData.totalAmount}

onChange={handleChange}

/>

</div>





<div className="col-md-4 mb-3">

<label>
Discount
</label>

<input

type="number"

className="form-control"

name="discount"

value={formData.discount}

onChange={handleChange}

/>

</div>





<div className="col-md-4 mb-3">

<label>
Final Amount
</label>

<input

className="form-control"

value={formData.finalAmount}

readOnly

/>

</div>






<div className="col-md-4 mb-3">

<label>
Payment Date
</label>

<input

type="date"

className="form-control"

name="paymentDate"

value={formData.paymentDate}

onChange={handleChange}

/>

</div>





<div className="col-md-8 mb-3">

<label>
Remarks
</label>

<textarea

className="form-control"

name="remarks"

value={formData.remarks}

onChange={handleChange}

/>

</div>



</div>





<button className="btn btn-success">

<i className="bi bi-save"></i>

{" "}

{editingFee ? "Update Fee" : "Save Fee"}

</button>


</form>


</div>


</div>


);


}


export default FeeForm;