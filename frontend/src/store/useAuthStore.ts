import { create } from 'zustand';

interface AuthState {
  user: any | null;       // Placeholder for our JWT Payload
  isAuthenticated: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (userData) => {
    // We will save our JWT to localStorage here eventually
    set({ user: userData, isAuthenticated: true });
  },
  
  logout: () => {
    // Clear localStorage Token
    set({ user: null, isAuthenticated: false });
  }
}));
