import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://travel-package-booking-task-server.onrender.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear(); 
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
