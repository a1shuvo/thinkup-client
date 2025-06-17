import axios from "axios";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
});

export default axiosSecure;
