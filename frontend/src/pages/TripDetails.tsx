import { useParams } from 'react-router-dom';
import AIChatbot from '../components/chat/AIChatbot';
import { motion } from 'framer-motion';

export default function TripDetails() {
  const { id } = useParams();

  // For this lesson, we simulate grabbing the trip data. 
  // Next lesson we will inject the Axios backend call by 'id'.
  const mockTrip = {
    title: "Mountain Cabin Escape",
    location: "Swiss Alps",
    price: 850,
    description: "Experience the ultimate serene gateway nestled literally in the clouds. This premium cabin offers heated floors, panoramic glass ceilings for stargazing, and private negotiation access via our AI agent.",
    imageUrl: "https://images.unsplash.com/photo-1518730518541-d08432688b50?auto=format&fit=crop&q=80&w=1000",
    rating: 4.5
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Hero Image Section */}
      <div className="relative w-full h-[50vh] rounded-3xl overflow-hidden shadow-2xl mb-10">
         <img src={mockTrip.imageUrl} alt={mockTrip.title} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
         
         <div className="absolute bottom-10 left-10 text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-2">{mockTrip.title}</h1>
            <p className="text-xl font-bold opacity-80 flex items-center gap-2">📍 {mockTrip.location} | ⭐ {mockTrip.rating}</p>
         </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
         
         {/* Left Description Panel */}
         <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold">About this Trip</h2>
            <p className="text-lg opacity-70 leading-relaxed text-justify">
               {mockTrip.description}
            </p>
         </div>

         {/* Right Booking / Payment Panel */}
         <div className="glass-card p-8 sticky top-28 h-fit border-t-4 border-brand">
            <h3 className="text-2xl font-black mb-4 flex items-center justify-between">
               <span>Total Cost</span>
               <span className="text-brand">${mockTrip.price}</span>
            </h3>
            
            <p className="opacity-50 text-sm mb-6">Taxes & fees automatically calculated at final checkout via Stripe.</p>

            <button className="w-full py-4 bg-brand text-white font-black text-xl rounded-xl hover:shadow-2xl hover:shadow-brand/50 transition-all mb-4">
               Secure Checkout
            </button>
            <p className="text-center text-xs opacity-40 uppercase font-bold tracking-widest">Powered by Stripe / Razorpay</p>
         </div>

      </div>

      {/* Floating UI Elements */}
      <AIChatbot tripTitle={mockTrip.title} />

    </motion.div>
  );
}
