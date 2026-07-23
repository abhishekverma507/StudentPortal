import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
{
    admissionNumber: {
    type: String,
    required: [true, "Admission Number is required"],
    unique: true,
    trim: true,
},

rollNumber: {
    type: Number,
    required: [true, "Roll Number is required"],
    min: [1, "Roll Number must be greater than 0"],
},

firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
},

lastName: {
    type: String,
    trim: true,
},

className: {
    type: String,
    required: [true, "Class is required"],
    trim: true,
},

section: {
    type: String,
    trim: true,
},

fatherName: {
    type: String,
    trim: true,
},

motherName: {
    type: String,
    trim: true,
},

gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["Male", "Female", "Other"],
    trim: true,
},

address: {
    type: String,
    trim: true,
},

photo: {
    type: String,
},

mobile: {
    type: String,
    match: [/^[0-9+\-\s()]{10,15}$/, "Invalid mobile number"],
},

status: {
    type: String,
    enum: ["Active", "Inactive", "Suspended", "Transferred", "Passed Out"],
    default: "Active",
},

},
{
    timestamps: true
}
);


const Student = mongoose.model("Student", studentSchema);

export default Student;