import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-toastify';

// Create a globally configured Axios instance
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercept Request: Inject JWT Token automatically
apiClient.interceptors.request.use(
    (config) => {
        // Grab the token out of localStorage where Zustand saves it
        const token = localStorage.getItem('jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Intercept Response: Globally handle expired tokens or crashes
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            toast.error("Your session has expired. Please log in again.");
            useAuthStore.getState().logout(); // Force logout
            // Optionally redirect to home page here
        }
        return Promise.reject(error);
    }
);

export default apiClient;
