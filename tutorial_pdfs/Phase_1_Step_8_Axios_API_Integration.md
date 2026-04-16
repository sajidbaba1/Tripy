# YouTube Masterclass Lesson 8: Connecting React to Spring Boot with Axios

## Instructor Opening Script (To Camera)
"Welcome back! At this exact moment, we have two isolated ecosystems. Our Spring Boot backend is securely locked down behind JWT Firewalls, and our React frontend has a beautiful Auth Modal but no way to actually submit data.

In this lesson, we build the golden bridge. We are going to configure `Axios` interceptors. This means every single time our Tripy frontend makes a network request, it will automatically pull the user's JWT from memory and inject it into the HTTP header, effortlessly bypassing the backend security walls."

---

## Part 1: Configuring Global API Instance

### Instructor Script (Screen Recording VS Code)
"We never want to type out the full `http://localhost:8080/api...` address every time we request data. Instead, we configure a base instance of Axios that knows exactly who we are talking to, and automatically attaches our Authorization tokens before a request leaves the browser."

### Code to Type (`frontend/src/api/axiosConfig.ts`)
"Inside `src`, create a new folder called `api`, and create a file called `axiosConfig.ts`:"

```typescript
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
```

### Explanation for the Audience:
"The `interceptors.request` is performing magic. Before any HTTP request goes across the internet, this function intercepts it in mid-air, grabs your Token out of local storage, and staples it to the `Authorization` header.
Simultaneously, `interceptors.response` catches errors. If Spring Boot throws a `401 Unauthorized` because someone's token expired after 24 hours, Axios catches the blast! It fires a glossy `react-toastify` notification and instantly updates `Zustand` to force a log out. Your entire platform is now synchronized and bulletproof."

---

## Part 2: Sending the Login Payload to Spring Boot

### Instructor Script
"Now that Axios is ready, let's create a dedicated Auth Service that specifically handles hitting our `/auth/signup` and `/auth/login` endpoints."

### Code to Type (`frontend/src/api/authService.ts`)
"In the `api` folder, create `authService.ts`:"

```typescript
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
```

### Explanation for the Audience:
"By separating our Axios calls into 'Services', our React UI components remain incredibly clean. When a user hits the submit button on our Framer Motion Modal, the modal simply calls `authService.login()` and waits for the magic token to return!"

---

## Instructor Outro (To Camera)
"Our bridge is complete. Data is now flowing seamlessly from React to Spring Boot, completely secured by our Axios payload interceptors. 

In the next lesson, we are going to start shifting away from infrastructure and focus on the Core Application—The Admin and Business Portals! We will build the Tripy Quick Action Dashboard and wire up the user profiles. Hit subscribe, and let's keep building this massive platform!"
