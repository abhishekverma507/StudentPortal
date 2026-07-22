import { useEffect, useState } from "react";
import axios from "axios";


function AttendanceSummary(){

    const [attendance, setAttendance] = useState({
        present:0,
        absent:0,
        late:0,
        leave:0,
        percentage:0,
        totalStudents:0
    });


useEffect(()=>{

axios
.get(`${API}/attendance/dashboard`)

.then((response)=>{

console.log(response.data);

setAttendance({
    present: response.data.data.present || 0,
    absent: response.data.data.absent || 0,
    late: response.data.data.late || 0,
    leave: response.data.data.leave || 0,
    percentage: response.data.data.percentage || 0,
    totalStudents: response.data.data.totalStudents || 0
});

})

.catch((error)=>{

console.log(error);

});


},[]);


    return(

        <div className="container mt-4">

    <h3 className="mb-3">
        Attendance Summary
    </h3>


            <div className="row">

                <div className="col-md-2">
    <div className="card text-center shadow">
        <div className="card-body">

            <h2>
                {attendance.totalStudents}
            </h2>

            <p>Total Students</p>

        </div>
    </div>
</div>


                <div className="col-md-2">
                    <div className="card text-center shadow">
                        <div className="card-body">

                            <h2 className="text-success">
                                {attendance.present}
                            </h2>

                            <p>Present</p>

                        </div>
                    </div>
                </div>



                <div className="col-md-2">
                    <div className="card text-center shadow">
                        <div className="card-body">

                            <h2 className="text-danger">
                                {attendance.absent}
                            </h2>

                            <p>Absent</p>

                        </div>
                    </div>
                </div>



                <div className="col-md-2">
                    <div className="card text-center shadow">
                        <div className="card-body">

                            <h2 className="text-warning">
                                {attendance.late}
                            </h2>

                            <p>Late</p>

                        </div>
                    </div>
                </div>



                <div className="col-md-2">
                    <div className="card text-center shadow">
                        <div className="card-body">

                            <h2 className="text-primary">
                                {attendance.leave}
                            </h2>

                            <p>Leave</p>

                        </div>
                    </div>
                </div>



                <div className="col-md-2">

                        <div className="card text-center shadow">

                        <div className="card-body">

                            <h2>
                                {attendance.percentage}%
                            </h2>

                            <p>
                                Attendance Percentage
                            </p>

                        </div>

                    </div>

                </div>


            </div>


        </div>

    );

}


export default AttendanceSummary;