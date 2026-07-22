function FeeDetailsModal({ fee, onClose }) {


    if(!fee) return null;



    return (

        <div

        className="modal fade show"

        style={{
            display:"block",
            backgroundColor:"rgba(0,0,0,0.5)"
        }}

        >


            <div className="modal-dialog modal-lg">


                <div className="modal-content">


                    <div className="modal-header bg-primary text-white">


                        <h5 className="modal-title">

                            <i className="bi bi-receipt"></i>
                            {" "}
                            Fee Details

                        </h5>



                        <button

                        className="btn-close"

                        onClick={onClose}

                        >

                        </button>


                    </div>





                    <div className="modal-body">


                        <div className="row">


                            <div className="col-md-6 mb-3">

                                <strong>
                                    Receipt No:
                                </strong>

                                <p>
                                    {fee.receiptNo}
                                </p>

                            </div>




                            <div className="col-md-6 mb-3">

                                <strong>
                                    Student Name:
                                </strong>

                                <p>
                                    {fee.studentName}
                                </p>

                            </div>





                            <div className="col-md-6 mb-3">

                                <strong>
                                    Admission No:
                                </strong>

                                <p>
                                    {fee.admissionNo}
                                </p>

                            </div>





                            <div className="col-md-6 mb-3">

                                <strong>
                                    Class:
                                </strong>

                                <p>
                                    {fee.className}
                                    -
                                    {fee.section}
                                </p>

                            </div>





                            <div className="col-md-6 mb-3">

                                <strong>
                                    Fee Type:
                                </strong>

                                <p>
                                    {fee.feeType}
                                </p>

                            </div>





                            <div className="col-md-6 mb-3">

                                <strong>
                                    Payment Mode:
                                </strong>

                                <p>
                                    {fee.paymentMode}
                                </p>

                            </div>





                            <div className="col-md-6 mb-3">

                                <strong>
                                    Total Amount:
                                </strong>

                                <p>
                                    ₹ {fee.totalAmount}
                                </p>

                            </div>





                            <div className="col-md-6 mb-3">

                                <strong>
                                    Final Amount:
                                </strong>

                                <p>
                                    ₹ {fee.finalAmount}
                                </p>

                            </div>





                            <div className="col-md-6 mb-3">

                                <strong>
                                    Payment Date:
                                </strong>

                                <p>
                                    {fee.paymentDate}
                                </p>

                            </div>



                            <div className="col-md-6 mb-3">

                                <strong>
                                    Status:
                                </strong>

                                <p className="text-success">

                                    {fee.status}

                                </p>

                            </div>


                        </div>


                    </div>





                    <div className="modal-footer">


                        <button

                        className="btn btn-secondary"

                        onClick={onClose}

                        >

                        Close

                        </button>


                    </div>


                </div>


            </div>


        </div>

    );


}


export default FeeDetailsModal;