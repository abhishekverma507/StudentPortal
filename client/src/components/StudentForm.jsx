import { useEffect, useState } from "react";

function StudentForm({ onAddStudent, editingStudent }) {

  const [formData, setFormData] = useState({
    admissionNumber: "",
    rollNumber: "",
    firstName: "",
    lastName: "",
    className: "",
    section: "",
    fatherName: "",
    motherName: "",
    mobile: "",
    gender: "",
    address: "",
    status: "Active",
    photo: "",
  });
const [errors, setErrors] = useState({});

  useEffect(() => {
  if (editingStudent) {
    setFormData({
      ...editingStudent,
    });
  }
}, [editingStudent]);

 function handleChange(e) {

  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value,
  });

  if (errors[name]) {
    setErrors({
      ...errors,
      [name]: "",
    });
  }

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

  const newErrors = {};

  if (!formData.admissionNumber.trim()) {
    newErrors.admissionNumber = "Admission Number is required";
  }

  if (!formData.rollNumber) {
    newErrors.rollNumber = "Roll Number is required";
  }

  if (!formData.firstName.trim()) {
    newErrors.firstName = "First Name is required";
  }

  if (!formData.className.trim()) {
    newErrors.className = "Class is required";
  }

  if (!formData.gender) {
  newErrors.gender = "Gender is required";
}

  if (!formData.mobile.trim()) {
    newErrors.mobile = "Mobile Number is required";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});

  onAddStudent(formData);
}

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
  {editingStudent
    ? "Update Student"
    : "Student Admission Form"}
</h4>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="row">
            
             <div className="col-md-12 mb-3">
  <label className="form-label">Student Photo</label>

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
              <label className="form-label">Admission Number <span className="text-danger">*</span></label>
              <input
                type="text"
                name="admissionNumber"
                className={`form-control ${
                errors.admissionNumber ? "is-invalid" : ""
                }`}
                value={formData.admissionNumber}
                onChange={handleChange}
                placeholder="Enter Admission Number"
              />
              <div className="invalid-feedback">
              {errors.admissionNumber}
              </div>
            </div>
               

            <div className="col-md-6 mb-3">
              <label className="form-label">Roll Number <span className="text-danger">*</span></label>
              <input
                type="number"
                name="rollNumber"
                className={`form-control ${
                 errors.rollNumber ? "is-invalid" : ""
          }`}
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Enter Roll Number"
              />
              <div className="invalid-feedback">
            {errors.rollNumber}
            </div>

            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">First Name <span className="text-danger">*</span></label>
              <input
                type="text"
                name="firstName"
                className={`form-control ${
                 errors.firstName ? "is-invalid" : ""
          }`}
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
              />
              <div className="invalid-feedback">
              {errors.firstName}
              </div>
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
              <label className="form-label">Class <span className="text-danger">*</span></label>
              <input
                type="text"
                name="className"
                className={`form-control ${
  errors.className ? "is-invalid" : ""
}`}
                value={formData.className}
                onChange={handleChange}
                placeholder="Enter Class"
              />
              <div className="invalid-feedback">
            {errors.className}
            </div>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Section</label>
              <input
                type="text"
                name="section"
                className="form-control"
                value={formData.section}
                onChange={handleChange}
              />
            </div>

           <div className="col-md-4 mb-3">
  <label className="form-label">
    Gender <span className="text-danger">*</span>
  </label>

  <select
    className={`form-select ${
      errors.gender ? "is-invalid" : ""
    }`}
    name="gender"
    value={formData.gender}
    onChange={handleChange}
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>

  <div className="invalid-feedback">
    {errors.gender}
  </div>
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
    <option value="Suspended">Suspended</option>
    <option value="Transferred">Transferred</option>
    <option value="Passed Out">Passed Out</option>
  </select>
</div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Father's Name</label>
              <input
                type="text"
                name="fatherName"
                className="form-control"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Mother's Name</label>
              <input
                type="text"
                name="motherName"
                className="form-control"
                value={formData.motherName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Mobile Number <span className="text-danger">*</span></label>
              <input
                type="text"
                name="mobile"
                className={`form-control ${
  errors.mobile ? "is-invalid" : ""
}`}
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
              />
              <div className="invalid-feedback">
  {errors.mobile}
</div>
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

          <div className="d-flex gap-2">

  <button
    type="submit"
    className="btn btn-success"
  >
    <i className={`bi ${
      editingStudent
        ? "bi-pencil-square"
        : "bi-person-plus-fill"
    } me-2`}></i>

    {editingStudent
      ? "Update Student"
      : "Add Student"}

  </button>

</div>

        </form>

      </div>

    </div>
  );
}
export default StudentForm;