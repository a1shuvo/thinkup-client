import axios from "axios";
import useAuth from "./useAuth";

const axiosSecureInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
});

const useAxiosSecure = () => {
    const { user, userSignOut } = useAuth();

    axiosSecureInstance.interceptors.request.use((config) => {
        if (user?.accessToken) {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    });

    axiosSecureInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                userSignOut();
            }
            return Promise.reject(error);
        }
    );

    return axiosSecureInstance;
};

export default useAxiosSecure;
