# YouTube Masterclass Lesson 12: Glassmorphic Trip Cards & Search Catalog

## Instructor Opening Script (To Camera)
"Welcome to Phase 3 of the Tripy Masterclass! Our infrastructure, routers, and security are perfectly polished. Now, we finally step into the core product: Managing Trips. 

When a Customer hits our 'Destinations' tab, they shouldn't just see a boring block of text. They need to see stunning, glossy photography encapsulated in micro-animated UI cards. Today, we are building the reusable `<TripCard />` component, and assembling the massive Customer Search Catalog where they can filter packages by price, location, and the coveted 'Nano Verified' status. Let's code."

---

## Part 1: Crafting the Core Trip Card 

### Instructor Script (Screen Recording VS Code)
"Because every trip listing will look uniform, we need to create a reusable component. We will use Framer Motion so that when a user hovers over a trip, the image softly zooms in and the card physically lifts off the page."

### Code to Type (`frontend/src/components/ui/TripCard.tsx`)
"In your `src/components/ui` folder, create `TripCard.tsx`:"

```tsx
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
            <h3 className="text-xl font-black heading-clip">{trip.title}</h3>
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
```

### Explanation for the Audience:
"Design is everything. Notice how we wrapped the `.group-hover:scale-110` onto the `img` tag. This means when the parent card is hovered, just the image scales up underneath the gradient overlay we wrote. And we conditionally rendered our `<div className="absolute top-4...">` so only trips containing the `isNanoVerified` boolean flag get our exclusive Premium Banana Badge!"

---

## Part 2: Building the Search Catalog Page

### Instructor Script
"Now let's dump a few of these cards onto a grid. We are building the `Catalog.tsx` page. This is the main screen the User interacts with when they click 'Destinations' from our Navbar."

### Code to Type (`frontend/src/pages/Catalog.tsx`)
"In your `pages` directory, create `Catalog.tsx`:"

```tsx
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
```

### Explanation for the Audience:
"We hardcoded mock data for now, but look at how flawlessly React renders lists. We mapped through our array, injected the data directly into our `<TripCard trip={trip} />` component, and wrapped it in Framer Motion so the entire 4-column grid cascades onto the screen sequentially. This is exactly what users will see when they hunt for trips!"

---

## Instructor Outro (To Camera)
"Tripy now has a beautifully populated storefront. However, right now we have to manually type the URL to get here. 

(Before the next video, ensure to open `AppRoutes.tsx` and change `<Route path="/destinations" element={<Catalog />} />` so the Navbar link routes directly here).

In our next lesson, we are finally connecting these React components back to our Spring Boot Backend. We will write the database logic for 'Trips', create our Controller, and fetch *real* packages directly from PostgreSQL! Hit subscribe, and I'll catch you in the next one."
