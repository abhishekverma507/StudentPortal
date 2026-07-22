import axios from "axios";
import API_URL from "../config/api";

const authAPI = axios.create({
  baseURL: `${API_URL}/auth`,
});

// Login
export const loginAdmin = (loginData) =>
  authAPI.post("/login", loginData);