import axios from "axios";
import API_URL from "../config/api";

const API = axios.create({
  baseURL: `${API_URL}/auth`,
});

// Login
export const loginAdmin = (loginData) =>
  API.post("/login", loginData);