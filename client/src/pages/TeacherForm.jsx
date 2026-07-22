import { useEffect, useState } from "react";

function TeacherForm({
  onAddTeacher,
  editingTeacher,
  setEditingTeacher
}) {

  const initialState = {
    employeeId: "",
    firstName: "",
    lastName: "",
    subject: "",
    qualification: "",
    experience: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    status: "Active",
    photo: ""
  };


  const [formData, setFormData] = useState(initialState);


  // Load data during edit
  useEffect(() => {

    if(editingTeacher){

      setFormData({

        setFormData({
  employeeId: editingTeacher.employeeId || "",
  firstName: editingTeacher.firstName || "",
  lastName: editingTeacher.lastName || "",
  gender: editingTeacher.gender || "",
  subject: editingTeacher.subject || "",
  qualification: editingTeacher.qualification || "",
  experience: editingTeacher.experience || "",
  joiningDate: editingTeacher.joiningDate
    ? editingTeacher.joiningDate.substring(0, 10)
    : "",
  mobile: editingTeacher.mobile || "",
  email: editingTeacher.email || "",
  address: editingTeacher.address || "",
  status: editingTeacher.status || "Active",
  photo: editingTeacher.photo || "",
});

    }
    else{

      setFormData(initialState);

    }

  },[editingTeacher]);



  function handleChange(e){

    const {name,value}=e.target;

    setFormData({

      ...formData,

      [name]:value

    });

    function handleImageChange(e) {

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {

    setFormData({
      ...formData,
      photo: reader.result,
    });

  };

  reader.readAsDataURL(file);

}

  }



  function handleSubmit(e){

    e.preventDefault();


   if (
  !formData.employeeId ||
  !formData.firstName ||
  !formData.lastName ||
  !formData.gender ||
  !formData.subject ||
  !formData.qualification ||
  !formData.joiningDate ||
  !formData.mobile ||
  !formData.email
) {

  alert("Please fill all mandatory fields.");

  return;

}

      return;

    }


    onAddTeacher(formData);


    if(!editingTeacher){

      setFormData(initialState);

    }

  }



  function cancelEdit(){

    setEditingTeacher(null);

    setFormData(initialState);

  }



  return (

    <div className="card mb-4">

      <div className="card-header bg-primary text-white">

        {
          editingTeacher
          ? "Update Teacher"
          : "Add Teacher"
        }

      </div>


      <div className="card-body">


        <form onSubmit={handleSubmit}>


          <div className="row">


            <div className="col-md-4 mb-3">

              <label className="form-label">
  Employee ID <span className="text-danger">*</span>
    </label>

<input
  type="text"
  className="form-control"
  name="employeeId"
  value={formData.employeeId}
  onChange={handleChange}
/>


            </div>



            <div className="col-md-4 mb-3">

              <label className="form-label">
  First Name <span className="text-danger">*</span>
</label>

<input
  type="text"
  className="form-control"
  name="firstName"
  value={formData.firstName}
  onChange={handleChange}
/>

            </div>



            <div className="col-md-4 mb-3">

              <label className="form-label">
  Last Name <span className="text-danger">*</span>
</label>

<input
  type="text"
  className="form-control"
  name="lastName"
  value={formData.lastName}
  onChange={handleChange}
/>
            </div>



            <div className="col-md-4 mb-3">

              <label>
                Subject
              </label>

              <input
                type="text"
                className="form-control"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />

            </div>



            <div className="col-md-4 mb-3">

              <label>
                Qualification
              </label>

              <input
                type="text"
                className="form-control"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
              />

            </div>



            <div className="col-md-4 mb-3">

              <label>
                Experience (Years)
              </label>

              <input
                type="number"
                className="form-control"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />

            </div>



            <div className="col-md-4 mb-3">

              <label>
                Gender
              </label>

              <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >

                <option value="">
                  Select
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>


              </select>

            </div>



            <div className="col-md-4 mb-3">

              <label>
                Mobile
              </label>

              <input
                type="text"
                className="form-control"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />

            </div>



            <div className="col-md-4 mb-3">

              <label>
                Email
              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>



            <div className="col-md-8 mb-3">

              <label>
                Address
              </label>

              <textarea

                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}

              />

            </div>


            <div className="col-md-4 mb-3">

              <label>
                Status
              </label>

              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>


              </select>

            </div>


          </div>



          <button
            type="submit"
            className="btn btn-success me-2"
          >

            {
              editingTeacher
              ? "Update Teacher"
              : "Add Teacher"
            }

          </button>



          {
            editingTeacher &&

            <button

              type="button"

              className="btn btn-secondary"

              onClick={cancelEdit}

            >

              Cancel

            </button>

          }


        </form>


      </div>


    </div>

  );

}


export default TeacherForm;