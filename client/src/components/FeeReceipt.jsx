function FeeReceipt({ fee }) {


    if(!fee) return null;


    const printReceipt = ()=>{

        window.print();

    };



    return (

        <div className="container mt-4">


            <div className="card shadow">


                <div className="card-body">


                    <div className="text-center">


                        <h2>
                            SCHOOL NAME
                        </h2>


                        <h4>
                            FEE PAYMENT RECEIPT
                        </h4>


                        <hr/>


                    </div>




                    <div className="row">


                        <div className="col-md-6">

                            <p>
                            <b>Receipt No:</b>
                            {" "}
                            {fee.receiptNo}
                            </p>


                            <p>
                            <b>Student Name:</b>
                            {" "}
                            {fee.studentName}
                            </p>


                            <p>
                            <b>Admission No:</b>
                            {" "}
                            {fee.admissionNo}
                            </p>


                            <p>
                            <b>Class:</b>
                            {" "}
                            {fee.className}-{fee.section}
                            </p>


                        </div>




                        <div className="col-md-6">


                            <p>
                            <b>Fee Type:</b>
                            {" "}
                            {fee.feeType}
                            </p>


                            <p>
                            <b>Payment Mode:</b>
                            {" "}
                            {fee.paymentMode}
                            </p>


                            <p>
                            <b>Date:</b>
                            {" "}
                            {fee.paymentDate}
                            </p>


                            <p>
                            <b>Status:</b>
                            {" "}
                            {fee.status}
                            </p>


                        </div>


                    </div>




                    <hr/>




                    <table className="table table-bordered">


                        <tbody>


                        <tr>

                        <th>
                        Total Amount
                        </th>

                        <td>
                        ₹ {fee.totalAmount}
                        </td>

                        </tr>



                        <tr>

                        <th>
                        Discount
                        </th>

                        <td>
                        ₹ {fee.discount}
                        </td>

                        </tr>




                        <tr>

                        <th>
                        Paid Amount
                        </th>

                        <td>
                        ₹ {fee.finalAmount}
                        </td>

                        </tr>



                        </tbody>


                    </table>





                    <div className="row mt-5">


                        <div className="col text-start">

                            Parent Signature

                        </div>


                        <div className="col text-end">

                            Authorized Signature

                        </div>


                    </div>




                    <div className="text-center mt-4">


                        <button

                        className="btn btn-success"

                        onClick={printReceipt}

                        >

                        <i className="bi bi-printer"></i>

                        Print Receipt

                        </button>


                    </div>




                </div>


            </div>


        </div>

    );


}


export default FeeReceipt;