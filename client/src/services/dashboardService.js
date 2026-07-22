import axios from "axios";
import API_URL from "../config/api";

const dashboardAPI = axios.create({
  baseURL: `${API_URL}/dashboard`,
});

export const getDashboardStats = () => dashboardAPI.get("/");