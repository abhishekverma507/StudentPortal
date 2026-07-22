import axios from "axios";
import API from "../config/api";


const API_URL = `${API}/students`;

export const getStudents = () =>
  axios.get(API_URL);

export const getStudentById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const addStudent = (student) =>
  axios.post(API_URL, student);

export const updateStudent = (id, student) =>
  axios.put(`${API_URL}/${id}`, student);

export const deleteStudent = (id) =>
  axios.delete(`${API_URL}/${id}`);