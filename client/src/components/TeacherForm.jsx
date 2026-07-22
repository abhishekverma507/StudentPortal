import { useEffect, useState } from "react";

function TeacherForm({ onAddTeacher, editingTeacher }) {

 const initialState = {
  employeeId: "",
  firstName: "",
  lastName: "",
  subject: "",
  qualification: "",
  experience: "",
  joiningDate: "",
  gender: "",
  mobile: "",
  email: "",
  address: "",
  status: "Active",
  photo: "",
};

const [formData, setFormData] = useState(initialState);

useEffect(() => {
  if (editingTeacher) {
    setFormData({
      ...initialState,
      ...editingTeacher,
      joiningDate: editingTeacher.joiningDate
        ? editingTeacher.joiningDate.substring(0, 10)
        : "",
    });
  } else {
    setFormData(initialState);
  }
}, [editingTeacher]);


  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

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

  function handleSubmit(e) {
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


   if (editingTeacher) {

console.log(formData);

  onAddTeacher({
    ...formData,
    _id: editingTeacher._id,
  });
  } else {
  onAddTeacher(formData);
}

setFormData(initialState);
  }

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">Teacher Registration Form</h4>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="row">
            
             <div className="col-md-12 mb-3">
  <label className="form-label">Teacher Photo</label>

  <input
    type="file"
    accept="image/*"
    className="form-control"
    onChange={handleImageChange}
  />
</div>

{formData.photo && (
  <div className="mt-3 text-center">
    <img
      src={formData.photo}
      alt="Preview"
      width="120"
      height="120"
      style={{
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  </div>
)}

            <div className="col-md-6 mb-3">
  <label className="form-label">Employee ID</label>

  <input
    type="text"
    className="form-control"
    name="employeeId"
    value={formData.employeeId}
    onChange={handleChange}
  />
</div>
<div className="col-md-6 mb-3">
  <label className="form-label">Subject</label>

  <input
    type="text"
    className="form-control"
    name="subject"
    value={formData.subject}
    onChange={handleChange}
  />
</div>

<div className="col-md-6 mb-3">
  <label className="form-label">Qualification</label>

  <input
    type="text"
    className="form-control"
    name="qualification"
    value={formData.qualification}
    onChange={handleChange}
  />
</div>

<div className="col-md-6 mb-3">
  <label className="form-label">Experience (Years)</label>

  <input
    type="number"
    className="form-control"
    name="experience"
    value={formData.experience}
    onChange={handleChange}
  />
</div>

<div className="col-md-4 mb-3">

  <label className="form-label">
    Joining Date <span className="text-danger">*</span>
  </label>

  <input
    type="date"
    className="form-control"
    name="joiningDate"
    value={formData.joiningDate}
    onChange={handleChange}
  />

</div>

<div className="col-md-6 mb-3">
  <label className="form-label">Email</label>

  <input
    type="email"
    className="form-control"
    name="email"
    value={formData.email}
    onChange={handleChange}
  />
</div>

            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

                <div className="col-md-4 mb-3">
  <label className="form-label">Status</label>

  <select
    className="form-select"
    name="status"
    value={formData.status}
    onChange={handleChange}
  >
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
   
  </select>
</div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                className="form-control"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
          type="submit"
          className="btn btn-success">
            {editingTeacher ? "Update Teacher" : "Add Teacher"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default TeacherForm;