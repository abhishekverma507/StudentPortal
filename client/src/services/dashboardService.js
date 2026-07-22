import axios from "axios";
import API_URL from "../config/api";

const API = axios.create({
  baseURL: `${API_URL}/dashboard`,
});

export const getDashboardStats = () => API.get("/");