# YouTube Masterclass Lesson 14: Pulling Live PostgreSQL Data to React

## Instructor Opening Script (To Camera)
"Welcome back! In our last video, we authored the Spring Boot Trip APIs. We made sure our endpoint `/api/public/trips/all` bypassed our strict JWT firewall. 

Today is incredibly exciting. We are going back to React. We are going to delete our hard-coded dummy data in the Vacation Catalog, and instead write a custom Axios service that knocks on Spring Boot's door, extracts real PostgreSQL database entries, and dynamically generates our glossy Trip Cards via `useEffect`. Let's wire the matrix together."

---

## Part 1: Writing the Frontend Axios Service

### Instructor Script (Screen Recording VS Code)
"We already configured our base Axios client to handle JWT interception. All we need to do now is write a lightweight service file to execute the `GET` request specifically for trips."

### Code to Type (`frontend/src/api/tripService.ts`)
"Inside your `src/api` folder, create a new file called `tripService.ts`:"

```typescript
import apiClient from './axiosConfig';
import { TripData } from '../components/ui/TripCard';

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
```

### Explanation for the Audience:
"Because we predefined our Type Interface `TripData` in our TripCard lesson, we can force Axios to return exactly `Promise<TripData[]>`. This means TypeScript will literally auto-complete our API payloads when we process them in the UI. If Spring Boot ever breaks the payload structure, VS Code screams at us immediately. That’s strict typings in action."

---

## Part 2: Purging the Dummy Data

### Instructor Script
"Now, head over to `Catalog.tsx`. Delete the block of hardcoded `DUMMY_TRIPS`. We are going to use two classic React hooks: `useState` to hold our API payload, and `useEffect` to trigger the Spring Boot Axios call the millisecond the page loads."

### Code to Type (`frontend/src/pages/Catalog.tsx`)
"Fully replace your `Catalog.tsx` with this live code:"

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import TripCard, { TripData } from '../components/ui/TripCard';
import { tripService } from '../api/tripService';

export default function Catalog() {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Trigger the API connection immediately on load
  useEffect(() => {
    const fetchLiveInventory = async () => {
      try {
        const data = await tripService.getAllTrips();
        setTrips(data);
      } catch (error) {
        console.error("Connectivity issue with backend API");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLiveInventory();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Header & Functional Search Bar (To be wired next lesson) */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
         <div>
            <h1 className="text-4xl md:text-6xl font-black mb-3">Explore <span className="text-brand">Destinations</span></h1>
            <p className="opacity-70 text-lg font-semibold">Live inventory directly from Tripy Vendors.</p>
         </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64 text-2xl animate-pulse font-bold">
            Loading Live Destinations...
        </div>
      ) : (
        <AnimatePresence>
          {trips.length === 0 ? (
            <div className="text-center p-20 glass-card">
               <h2 className="text-2xl font-bold opacity-50">No trips currently listed in the database.</h2>
               <p className="opacity-40">Are you a vendor? Log in to create the first package!</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {trips.map(trip => (
                <motion.div key={trip.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <TripCard trip={trip} />
                </motion.div>
               ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
```

### Explanation for the Audience:
"This is the culmination of Full Stack development. We introduced a `Loading` state, so if your Amazon AWS or Render server is taking time to wake up, the user sees a smooth 'Loading Live Destinations' pulse instead of a broken page. 
Then, `tripService.getAllTrips()` crosses the internet, talks to Spring Boot, extracts the JSON from PostgreSQL, and dumps it into our `setTrips` state variable. Framer Motion kicks in and gracefully cascades our real live cards onto the screen!"

---

## Instructor Outro (To Camera)
"There is no better feeling than successfully linking the React Frontend to a massive Spring Boot framework. If your backend database is empty, you'll see our sleek fallback message asking Vendors to log in!

In our next critical video, we are going to build the actual **Vendor Upload Protocol**. We'll transition to the Business Dashboard, build a glossy forms UI with file uploads (for images), and send a `POST` request with our JWT to literally inject new Trips into the PostgreSQL database. I'll see you there!"
