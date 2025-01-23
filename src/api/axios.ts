import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    const isFormData = config.data instanceof FormData;
    config.headers["Content-Type"] = isFormData
      ? "multipart/form-data"
      : "application/json";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.error("Unauthorized. Redirecting to login...");
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      } else if (status >= 500) {
        console.error("Server error. Please try again later.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
