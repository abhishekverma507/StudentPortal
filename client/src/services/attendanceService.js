import axios from "axios";
import API_URL from "../config/api";

const attendanceAPI = axios.create({
  baseURL: `${API_URL}/attendance`,
});

export const getAttendance = () => attendanceAPI.get("/");

export const addAttendance = (data) =>
  attendanceAPI.post("/", data);

export const saveAttendance = (data) =>
  attendanceAPI.post("/bulk", data);

export const updateAttendance = (id, data) =>
  attendanceAPI.put(`/${id}`, data);

export const deleteAttendance = (id) =>
  attendanceAPI.delete(`/${id}`);