import axios from "axios";
import API_URL from "../config/api";

const STUDENT_URL = `${API_URL}/students`;

export const getStudents = () =>
  axios.get(STUDENT_URL);

export const getStudentById = (id) =>
  axios.get(`${STUDENT_URL}/${id}`);

export const addStudent = (student) =>
  axios.post(STUDENT_URL, student);

export const updateStudent = (id, student) =>
  axios.put(`${STUDENT_URL}/${id}`, student);

export const deleteStudent = (id) =>
  axios.delete(`${STUDENT_URL}/${id}`);