import { motion } from 'framer-motion';

export interface TripData {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  isNanoVerified: boolean;
  rating: number;
}

export default function TripCard({ trip }: { trip: TripData }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass-card group relative overflow-hidden flex flex-col justify-between h-[420px] cursor-pointer"
    >
      {/* Glossy Image Container with Hover Zoom */}
      <div className="absolute inset-0 h-[60%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent z-10 opacity-60" />
        <motion.img 
          src={trip.imageUrl} 
          alt={trip.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Nano Verified Badge overlay */}
        {trip.isNanoVerified && (
           <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold flex items-center gap-2 text-white shadow-xl">
             🍌 Nano Verified
           </div>
        )}
      </div>

      {/* Text Details Area */}
      <div className="relative z-20 mt-auto p-5 bg-brand-light dark:bg-brand-dark border-t border-gray-200/10">
         <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-black">{trip.title}</h3>
            <div className="flex items-center gap-1 font-bold text-sm">
               ⭐ {trip.rating}
            </div>
         </div>
         <p className="text-sm opacity-60 font-semibold mb-4 flex items-center gap-2">
            📍 {trip.location}
         </p>
         
         <div className="flex items-center justify-between border-t border-gray-500/20 pt-4">
            <div>
              <span className="text-2xl font-black text-brand">${trip.price}</span>
              <span className="text-xs opacity-50 ml-1">/ person</span>
            </div>
            <button className="px-5 py-2 rounded-xl bg-brand text-white font-bold hover:bg-brand/80 transition-colors shadow-lg shadow-brand/30">
              View Info
            </button>
         </div>
      </div>
    </motion.div>
  );
}
