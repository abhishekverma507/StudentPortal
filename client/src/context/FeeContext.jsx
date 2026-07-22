import { createContext, useContext, useEffect, useState } from "react";


const FeeContext = createContext();


export function FeeProvider({ children }) {


  const [fees, setFees] = useState(() => {

    const savedFees = localStorage.getItem("fees");

    return savedFees 
      ? JSON.parse(savedFees) 
      : [];

  });



  // Save fees to localStorage
  useEffect(() => {

    localStorage.setItem(
      "fees",
      JSON.stringify(fees)
    );

  }, [fees]);




  // Add Fee
  const addFee = (feeData) => {

    const newFee = {

      id: Date.now(),

      receiptNo:
      "REC" + Date.now(),

      ...feeData

    };


    setFees(prev => [
      ...prev,
      newFee
    ]);

  };





  // Update Fee
  const updateFee = (updatedFee) => {


    setFees(prev =>

      prev.map(fee =>

        fee.id === updatedFee.id
        ? updatedFee
        : fee

      )

    );

  };






  // Delete Fee
  const deleteFee = (id) => {


    setFees(prev =>

      prev.filter(
        fee => fee.id !== id
      )

    );


  };





  return (

    <FeeContext.Provider

      value={{

        fees,
        setFees,
        addFee,
        updateFee,
        deleteFee

      }}

    >

      {children}

    </FeeContext.Provider>

  );


}





export function useFees(){

  return useContext(FeeContext);

}