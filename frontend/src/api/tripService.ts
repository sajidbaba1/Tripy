import apiClient from './axiosConfig';
import type { TripData } from '../components/ui/TripCard';

export const tripService = {
    // Note: This matches the Spring Boot @GetMapping we wrote
    getAllTrips: async (): Promise<TripData[]> => {
        try {
            const response = await apiClient.get('/public/trips/all');
            return response.data;
        } catch (error: any) {
            console.error("Failed to fetch live trips:", error);
            throw error;
        }
    },
    
    // We will use this later for the search bar
    searchTrips: async (location: string): Promise<TripData[]> => {
        try {
            const response = await apiClient.get(`/public/trips/search?location=${location}`);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }
};
