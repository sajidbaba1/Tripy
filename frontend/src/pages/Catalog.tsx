import { motion } from 'framer-motion';
import TripCard, { TripData } from '../components/ui/TripCard';

// Dummy Data until our Spring Boot API is wired up!
const DUMMY_TRIPS: TripData[] = [
  { id: '1', title: 'Santorini Villa Retreat', location: 'Greece', price: 1250, imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac542?auto=format&fit=crop&q=80&w=1000', isNanoVerified: true, rating: 4.9 },
  { id: '2', title: 'Mountain Cabin Escape', location: 'Swiss Alps', price: 850, imageUrl: 'https://images.unsplash.com/photo-1518730518541-d08432688b50?auto=format&fit=crop&q=80&w=1000', isNanoVerified: false, rating: 4.5 },
  { id: '3', title: 'Oceanfront Maldives', location: 'Maldives', price: 2100, imageUrl: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&q=80&w=1000', isNanoVerified: true, rating: 5.0 },
  { id: '4', title: 'Kyoto Temple Tour', location: 'Japan', price: 920, imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000', isNanoVerified: true, rating: 4.8 }
];

export default function Catalog() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Catalog Header & Filters (Static for now) */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
         <div>
            <h1 className="text-4xl md:text-6xl font-black mb-3">Explore <span className="text-brand">Destinations</span></h1>
            <p className="opacity-70 text-lg font-semibold">Find the perfect verified trip curated just for you.</p>
         </div>
         
         <div className="flex gap-3 w-full md:w-auto">
            <input type="text" placeholder="Search locations..." className="flex-1 glass-card p-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-brand" />
            <button className="glass-card px-6 py-4 font-bold rounded-xl hover:bg-gray-500/10 transition-colors">Filters</button>
         </div>
      </div>

      {/* The Trip Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {DUMMY_TRIPS.map(trip => (
          <motion.div key={trip.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <TripCard trip={trip} />
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
