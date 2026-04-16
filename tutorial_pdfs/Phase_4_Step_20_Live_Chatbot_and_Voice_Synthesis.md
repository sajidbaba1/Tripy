# YouTube Masterclass Lesson 20: Live AI Web Sockets & Voice Synthesis

## Instructor Opening Script (To Camera)
"Welcome back! Our Tripy application now contains a stunning floating AI component on the frontend, and an incredibly powerful Google Gemini integration on the backend. 

Today, we bring them together. We are going to rip out the fake simulated chat logic and write an Axios post connection to transmit our user inputs to the server. But we aren't stopping there. We are going to integrate the browser's native `SpeechSynthesis` Web API so that whenever the AI agent responds, it literally reads the text out loud smoothly! Prepare for an incredible user experience."

---

## Part 1: Writing the TTS & Axios Logic

### Instructor Script (Screen Recording VS Code)
"Open up `AIChatbot.tsx`. We are tearing down our `handleSend` function. We need to introduce an `isLoading` barrier so users can't spam messages while the AI is thinking, and we need to write a quick TTS function that accesses the Browser Voice Engine."

### Code to Type (`frontend/src/components/chat/AIChatbot.tsx`)
"Fully replace `AIChatbot.tsx` with this final logic:"

```tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import apiClient from '../../api/axiosConfig';

export default function AIChatbot({ tripTitle }: { tripTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputBox, setInputBox] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: `Hi! I'm the Tripy agent for ${tripTitle}. Want to learn more or negotiate a group discount?` }
  ]);

  // Global Text-To-Speech Function
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any currently playing audio
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.1; 
      utterance.rate = 1.0; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputBox.trim() || isTyping) return;

    const userText = inputBox;
    // 1. Instantly display user message
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInputBox('');
    setIsTyping(true);

    try {
        // 2. Blast it to Spring Boot!
        const response = await apiClient.post('/public/ai/chat', {
            message: userText,
            context: tripTitle
        });

        const aiResponseText = response.data.reply;
        
        // 3. Mount the AI response to the UI
        setMessages(prev => [...prev, { role: 'ai', text: aiResponseText }]);

    } catch (error) {
        setMessages(prev => [...prev, { role: 'ai', text: "Sorry, my neural connection to the Tripy servers dropped. Try again!" }]);
    } finally {
        setIsTyping(false);
    }
  };

  // Auto-Scroll to bottom whenever messages update
  useEffect(() => {
     if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
     }
  }, [messages]);

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
              <button onClick={() => { setIsOpen(false); window.speechSynthesis.cancel(); }} className="hover:text-red-300 font-black">X</button>
            </div>

            {/* Chat History */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scroll-smooth">
               {messages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: msg.role === 'ai' ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'ai' ? 'bg-gray-200 dark:bg-gray-800 self-start rounded-tl-none text-sm' : 'bg-brand text-white self-end rounded-tr-none text-sm font-semibold shadow-md'}`}
                  >
                    {msg.text}
                    {/* Attach physical speaker buttons strictly to AI messages */}
                    {msg.role === 'ai' && (
                       <button onClick={() => speakText(msg.text)} className="block mt-2 text-xs opacity-50 hover:opacity-100 transition-opacity">
                         🔊 Play Audio
                       </button>
                    )}
                  </motion.div>
               ))}
               
               {/* Pulsing loading indicator when AI is generating */}
               {isTyping && (
                  <div className="self-start bg-gray-200 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none text-sm animate-pulse flex gap-1">
                     <span className="h-2 w-2 bg-brand rounded-full"></span>
                     <span className="h-2 w-2 bg-brand rounded-full delay-75"></span>
                     <span className="h-2 w-2 bg-brand rounded-full delay-150"></span>
                  </div>
               )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-gray-200/20 flex gap-2">
               <input 
                 type="text" 
                 value={inputBox}
                 disabled={isTyping}
                 onChange={e => setInputBox(e.target.value)}
                 placeholder={isTyping ? "AI is typing..." : "Negotiate with the AI..."} 
                 className="flex-1 bg-transparent outline-none border border-gray-500/30 rounded-xl px-3 text-sm focus:border-brand disabled:opacity-50"
               />
               <button type="submit" disabled={isTyping} className="bg-brand text-white p-2 rounded-xl disabled:bg-gray-500">➤</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

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
"The amount of complexity packed into this one file is staggering! We created an `isTyping` lock that replaces the text input with an animated typing bubble (`span className="h-2 animate-pulse"`). We used `useRef` to target the chat window div—so whenever a new message is appended, React instantly scrolls you perfectly to the bottom!

And look at the Speaker Button. Whenever an AI message generates, we nest a 'Play Audio' button at the bottom of the bubble. Clicking it utilizes `window.speechSynthesis`, ripping the generated text from the browser DOM and rendering it through the user's physical computer speakers! The Tripy AI can now actually *speak* to your customers!"

---

## Instructor Outro (To Camera)
"Phase 4 is complete. You have a public destination catalog, a masterclass details page, and a fully sentient AI chatbot capable of negotiating verbally with users!

In our final sprint, Phase 5, we tackle **Analytics and The Dark Mode System Settings**. We are going to create the Super Admin portal, integrate beautiful React Recharts for revenue metrics, and give our users total control over their aesthetics. Stay tuned!"
