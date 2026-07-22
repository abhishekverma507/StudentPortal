import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";



function AttendanceDashboard(){

const [summary,setSummary] = useState({
total:0,
present:0,
absent:0,
late:0,
leave:0,
percentage:0

});



useEffect(()=>{

loadAttendanceSummary();

},[]);



async function loadAttendanceSummary(){

try{


const response = await axios.get(`${API_URL}/attendance/dashboard`);

const data = response.data.data;


setSummary({

  total: data.totalStudents,

  present: data.present,

  absent: data.absent,

  late: data.late,

  leave: data.leave,

  percentage: data.percentage

});



}
catch(error){

console.error(error);

}


}



return(




<div className="row g-3 mb-4">


<div className="col-md">

  <div className="card text-center shadow">

    <div className="card-body">

      <h2>{summary.total}</h2>

      <p> <strong>Total Students</strong></p>

    </div>

  </div>

</div>

<div className="col-md">

<div className="card text-center shadow">

<div className="card-body">

<h6>
Present Today
</h6>


<h2 className="text-success">

{summary.present}

</h2>


</div>

</div>

</div>




<div className="col-md">

<div className="card text-center shadow">

<div className="card-body">

<h6>
Absent Today
</h6>


<h2 className="text-danger">

{summary.absent}

</h2>


</div>

</div>

</div>




<div className="col-md">

<div className="card text-center shadow">

<div className="card-body">

<h6>
Late
</h6>


<h2 className="text-warning">

{summary.late}

</h2>


</div>

</div>

</div>




<div className="col-md">

<div className="card text-center shadow">

<div className="card-body">

<h6>
Leave
</h6>


<h2 className="text-primary">

{summary.leave}

</h2>


</div>

</div>

</div>




<div className="col-md-12 mt-3">


<div className="card text-center shadow">


<div className="card-body">


<h5>
Attendance Percentage
</h5>


<h1>

{summary.percentage}%

</h1>


</div>


</div>


</div>



</div>


)


}


export default AttendanceDashboard;