import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosPublic = axios.create({
  baseURL: API_URL,
});

export default axiosPublic;
