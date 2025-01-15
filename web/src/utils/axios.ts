import axios from "axios";
import { base_url } from "../constants/env";

const axiosInstance = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = null;
    try {
      const cookies = document.cookie.split('; ')
      const accessTokenCookie = cookies.find((cookie) => cookie.startsWith('access-token='))
      if (accessTokenCookie) {
        token = accessTokenCookie.split('=')[1]
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config;
    } catch (error) {
      console.error("Error fetching token:", error)
      return config
    }
  },
  (error) => {
    return Promise.reject(error)
  }
);

export const setupAxiosInterceptors = (navigate: any) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 403) {
        localStorage.clear()
        navigate('/signin')
      }
      return Promise.reject(error)
    }
  );
};

export default axiosInstance;