import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";

function AttendanceHistory(){

const [records,setRecords] = useState([]);

const [search,setSearch] = useState("");

const [filterDate,setFilterDate] = useState("");

const [filterClass,setFilterClass] = useState("");

const [filterSection,setFilterSection] = useState("");

const [editingRecord,setEditingRecord] = useState(null);

const [editStatus,setEditStatus] = useState("");

const [editRemarks,setEditRemarks] = useState("");



useEffect(()=>{

loadAttendance();

},[]);

function handleEdit(record){

    console.log("Opening edit", record);

    setEditingRecord(record);

    setEditStatus(record.status);

    setEditRemarks(record.remarks || "");

}

async function loadAttendance(){

try{

const response = await axios.get(
`${API_URL}/attendance`
);


setRecords(response.data.data);


}
catch(error){

console.error(error);

}

}

async function handleUpdate(){


try{


await axios.put(

`${API_URL}/attendance/${editingRecord._id}`,

{

status:editStatus,

remarks:editRemarks

}

);



setEditingRecord(null);


loadAttendance();


alert(
"Attendance updated successfully"
);


}
catch(error){

console.error(error);

alert(
            "Unable to update attendance"
        );

}

}

const filteredRecords = records.filter((record)=>{


const name =
`${record.studentId?.firstName || ""}
${record.studentId?.lastName || ""}`
.toLowerCase();


const admission =
record.studentId?.admissionNumber
?.toLowerCase() || "";


const roll =
String(record.studentId?.rollNumber || "");



const recordDate =
new Date(record.attendanceDate)
.toISOString()
.split("T")[0];


async function handleDelete(id){


const confirmDelete =
window.confirm(
"Are you sure you want to delete this attendance?"
);


if(!confirmDelete)
return;



try{


await axios.delete(
`${API_URL}/attendance/${id}`
);



loadAttendance();


alert(
"Attendance deleted successfully"
);


}
catch(error){

console.error(error);

}


}
 

return (

(
name.includes(search.toLowerCase())

||

admission.includes(search.toLowerCase())

||

roll.includes(search)

)

&&


(
filterDate === ""
||
recordDate === filterDate
)

&&


(
filterClass === ""
||
record.studentId?.className === filterClass
)

&&


(
filterSection === ""
||
record.studentId?.section === filterSection
)


);


});


return(

<div className="card">


<div className="card-body">


<h4>
Attendance History
</h4>



<input

type="text"

className="form-control mb-3"

placeholder="Search Student Name"

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>

<div className="row mb-3">


<div className="col-md-4">

<input

type="text"

className="form-control"

placeholder="Search Name / Admission / Roll"

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>

</div>



<div className="col-md-3">

<input

type="date"

className="form-control"

value={filterDate}

onChange={(e)=>
setFilterDate(e.target.value)
}

/>

</div>




<div className="col-md-2">


<select

className="form-select"

value={filterClass}

onChange={(e)=>
setFilterClass(e.target.value)
}

>


<option value="">
Class
</option>

<option value="1">
1
</option>

<option value="2">
2
</option>

<option value="3">
3
</option>

<option value="4">
4
</option>

<option value="5">
5
</option>

</select>


</div>




<div className="col-md-2">


<select

className="form-select"

value={filterSection}

onChange={(e)=>
setFilterSection(e.target.value)
}

>


<option value="">
Section
</option>

<option value="A">
A
</option>

<option value="B">
B
</option>

<option value="C">
C
</option>


</select>


</div>



</div>

<table className="table table-bordered">

<thead>

<tr>

<th>Date</th>

<th>Student Name</th>

<th>Admission No</th>

<th>Class</th>

<th>Section</th>

<th>Status</th>

<th>Remarks</th>

<th>Action</th>

</tr>

</thead>


<tbody>

{

filteredRecords.map((record)=>(
<tr key={record._id}>


<td>

{
new Date(record.attendanceDate)
.toLocaleDateString()
}

</td>


<td>

{
record.studentId?.firstName
}

{" "}

{
record.studentId?.lastName
}

</td>


<td>

{
record.studentId?.admissionNumber
}

</td>


<td>

{
record.studentId?.className
}

</td>


<td>

{
record.studentId?.section
}

</td>


<td>

{
record.status
}

</td>


<td>

{
record.remarks || "-"
}

</td>

<td>


<button
className="btn btn-warning btn-sm me-2"
onClick={() => {
console.log("Edit clicked", record);
handleEdit(record);
}}
>
Edit
</button>


<button

className="btn btn-danger btn-sm"

onClick={()=>
handleDelete(record._id)
}

>

Delete

</button>


</td>


</tr>

))

}

</tbody>


</table>



</div>

{
editingRecord && (

<div className="card mt-3">

<div className="card-body">


<h5>
Edit Attendance
</h5>


<select

className="form-select mb-3"

value={editStatus}

onChange={(e)=>
setEditStatus(e.target.value)
}

>


<option>
Present
</option>

<option>
Absent
</option>

<option>
Late
</option>

<option>
Leave
</option>


</select>



<input

className="form-control mb-3"

value={editRemarks}

onChange={(e)=>
setEditRemarks(e.target.value)
}

placeholder="Remarks"

/>



<button

className="btn btn-success me-2"

onClick={handleUpdate}

>

Update

</button>


<button

className="btn btn-secondary"

onClick={()=>
setEditingRecord(null)
}

>

Cancel

</button>



</div>

</div>


)
}

</div>


)


}


export default AttendanceHistory;