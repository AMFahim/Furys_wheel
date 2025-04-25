import axios from 'axios';
import { getCookie } from "cookies-next";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Log request details in development
    if (process.env.NODE_ENV === "development") {
      console.log("Request:", {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
        headers: config.headers,
      });
    }

    // Retrieve access token from cookies
    const accessToken = getCookie("token");

    // Log the retrieved access token
    console.log("accessToken:", accessToken);

    // Add Authorization header if access token exists
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Log and reject the error
    if (process.env.NODE_ENV === "development") {
      console.error("Request error:", error);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
