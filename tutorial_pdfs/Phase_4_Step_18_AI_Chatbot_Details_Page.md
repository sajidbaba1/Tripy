# YouTube Masterclass Lesson 18: The Trip Details Page & AI Chat Interface

## Instructor Opening Script (To Camera)
"Welcome to Phase 4! We have beautiful listings, but what happens when a Customer clicks on one? 

We need to build a `TripDetails` page. But Tripy isn't just a standard booking site; we are integrating next-generation AI. Today, we are not just building the details view—we are engineering a floating **AI Chatbot component** that sits on top of the listing. This bot will eventually use Gemini to answer user questions, negotiate prices, and even convert text to speech! Let's get to work."

---

## Part 1: The AI Chatbot Interface

### Instructor Script (Screen Recording VS Code)
"Before we build the giant details page, let's build the interactive widget that sits on top of it. We are going to use Framer Motion to make a chat window that gracefully slides up when the user clicks 'Chat with AI Agent'."

### Code to Type (`frontend/src/components/chat/AIChatbot.tsx`)
"Create a new folder in `components` called `chat`, and build `AIChatbot.tsx`:"

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIChatbot({ tripTitle }: { tripTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: `Hi! I'm the Tripy agent for ${tripTitle}. Want to learn more or negotiate a group discount?` }
  ]);
  const [inputBox, setInputBox] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputBox.trim()) return;

    // 1. Add User Message
    setMessages(prev => [...prev, { role: 'user', text: inputBox }]);
    setInputBox('');

    // 2. Simulate AI Processing Delay (Will be replaced with actual API!)
    setTimeout(() => {
       setMessages(prev => [...prev, { role: 'ai', text: "[Simulated Response]: Let me check the vendor's availability for you..." }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 sm:w-96 h-[500px] glass-card shadow-2xl border border-brand/30 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand text-white p-4 font-bold flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <h3>Tripy AI Agent</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-red-300 font-black">X</button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
               {messages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: msg.role === 'ai' ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'ai' ? 'bg-gray-200 dark:bg-gray-800 self-start rounded-tl-none text-sm' : 'bg-brand text-white self-end rounded-tr-none text-sm font-semibold shadow-md'}`}
                  >
                    {msg.text}
                  </motion.div>
               ))}
            </div>

            {/* AI Control Tool Panel (Text-To-Speech Placeholders) */}
            <div className="px-4 py-2 bg-gray-500/10 border-t border-gray-500/20 flex gap-2 justify-center text-xs opacity-60">
                <button className="hover:text-brand">🔊 Read Aloud</button> | 
                <button className="hover:text-brand">🎤 Speak Input</button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-gray-200/20 flex gap-2">
               <input 
                 type="text" 
                 value={inputBox}
                 onChange={e => setInputBox(e.target.value)}
                 placeholder="Ask about the trip..." 
                 className="flex-1 bg-transparent outline-none border border-gray-500/30 rounded-xl px-3 text-sm focus:border-brand"
               />
               <button type="submit" className="bg-brand text-white p-2 rounded-xl">➤</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center text-3xl shadow-brand/50 shadow-2xl border-2 border-white/20 ml-auto block"
      >
        💬
      </motion.button>
    </div>
  );
}
```

### Explanation for the Audience:
"We utilized Framer Motion's `<AnimatePresence>` wrapper. In React, when a component is destroyed, it instantly vanishes. But with AnimatePresence, we can inject an `exit={{ opacity: 0 }}` transition! This means when the user clicks 'X' to close the chat, the window smoothly melts away instead of violently snapping out of existence."

---

## Part 2: Assembling the Full Trip Details Component

### Instructor Script
"Now, we build the giant landing page for the specific trip and mount our magical AI Chatbot component inside it!"

### Code to Type (`frontend/src/pages/TripDetails.tsx`)
"In `pages`, create `TripDetails.tsx`:"

```tsx
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
```

### Explanation for the Audience:
"The `sticky top-28` utility class inside our right-hand booking panel is an amazing CSS trick. As the user reads massive paragraphs about the trip description on the left, the checkout button stays locked gracefully on the right side of the screen! And at the very bottom of the file, we simply drop our `<AIChatbot>` wrapper. The AI agent now floats persistently on the screen."

---

## Instructor Outro (To Camera)
"(Quick Note: Ensure you add `<Route path="/trip/:id" element={<TripDetails />} />` to your `AppRoutes.tsx` config before moving forward).

Our Customer workflow is amazing. But right now, our Chatbot is just spitting out hardcoded strings on a 1.5-second timer. 
In the next masterclass video, we invoke true magic. We are linking the Gemini API! We will write an aggressive prompt instructing the AI to act as a literal Negotiation Agent that can authorize 10% discounts dynamically! I'll see you there."
