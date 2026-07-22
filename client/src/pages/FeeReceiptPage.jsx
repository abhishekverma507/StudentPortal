import { useLocation } from "react-router-dom";
import FeeReceipt from "../components/FeeReceipt";


function FeeReceiptPage(){

    const location = useLocation();

    const fee = location.state;


    return (

        <FeeReceipt

            fee={fee}

        />

    );

}


export default FeeReceiptPage;