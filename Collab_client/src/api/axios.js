import { toast } from "@/hooks/use-toast";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
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
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    } else if (error.response?.status === 403) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      toast({
        title: "Error",
        description: error.response?.data.message || "Something went wrong",
        variant: "destructive",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;