import apiClient from './axiosConfig';

export const authService = {
    
    register: async (username: string, email: string, password: string) => {
        try {
            const response = await apiClient.post('/auth/signup', {
                username,
                email,
                password
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || "Registration failed";
        }
    },

    login: async (email: string, password: string) => {
        try {
            const response = await apiClient.post('/auth/signin', { email, password });
            return response.data; // This data will contain the JWT token from Spring Boot!
        } catch (error: any) {
            throw error.response?.data || "Login failed";
        }
    }
};
