import axios from "axios";
import API_URL from "../config/api";

const TEACHER_URL = `${API_URL}/teachers`;

export const getTeachers = () =>
  axios.get(TEACHER_URL);

export const getTeacherById = (id) =>
  axios.get(`${TEACHER_URL}/${id}`);

export const addTeacher = (teacher) =>
  axios.post(TEACHER_URL, teacher);

export const updateTeacher = (id, teacher) =>
  axios.put(`${TEACHER_URL}/${id}`, teacher);

export const deleteTeacher = (id) =>
  axios.delete(`${TEACHER_URL}/${id}`);