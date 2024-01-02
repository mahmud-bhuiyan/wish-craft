import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

// using interceptors
export const axiosNonSecureInstance = axios.create({
  baseURL: apiURL,
});

export const axiosSecureInstance = axios.create({
  baseURL: apiURL,
});

axiosSecureInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.userToken
      ? localStorage.getItem("userToken")
      : null;
    config.headers.Authorization = `Bearer ${userToken}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
