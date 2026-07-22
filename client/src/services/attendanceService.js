import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/attendance",
});

// Attendance APIs
export const getAttendance = () => API.get("/");

export const addAttendance = (data) =>
  API.post("/", data);

export const saveAttendance = (data) =>
  API.post("/bulk", data);

export const updateAttendance = (id, data) =>
  API.put(`/${id}`, data);

export const deleteAttendance = (id) =>
  API.delete(`/${id}`);

