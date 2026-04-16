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
