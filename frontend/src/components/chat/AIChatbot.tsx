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
    <div className="fixed bottom-6 right-6 z-[100]">
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
                <button className="hover:text-brand font-semibold transition-colors duration-200">🔊 Read Aloud</button> | 
                <button className="hover:text-brand font-semibold transition-colors duration-200">🎤 Speak Input</button>
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
