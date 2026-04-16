import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md glass-card bg-brand-light/90 dark:bg-brand-dark/90 p-8 shadow-2xl"
        >
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white"
           >
             ✕
           </button>

           <h2 className="text-3xl font-black mb-6 text-center">
             {isLogin ? 'Welcome Back' : 'Join Tripy'}
           </h2>

           <form className="flex flex-col gap-4">
             {!isLogin && (
               <input 
                 type="text" 
                 placeholder="Username" 
                 className="p-3 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 border border-transparent focus:border-brand outline-none transition-all"
               />
             )}
             <input 
               type="email" 
               placeholder="Email Address" 
               className="p-3 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 border border-transparent focus:border-brand outline-none transition-all"
             />
             <input 
               type="password" 
               placeholder="Password" 
               className="p-3 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 border border-transparent focus:border-brand outline-none transition-all"
             />
             
             <button 
               type="button"
               className="mt-4 p-3 rounded-xl bg-brand text-white font-bold hover:shadow-lg hover:shadow-brand/50 transition-all active:scale-95"
             >
               {isLogin ? 'Sign In' : 'Create Account'}
             </button>
           </form>

           <p className="mt-6 text-center text-sm opacity-70">
             {isLogin ? "Don't have an account? " : "Already have an account? "}
             <span 
               onClick={() => setIsLogin(!isLogin)}
               className="text-brand font-bold cursor-pointer hover:underline"
             >
               {isLogin ? 'Sign Up' : 'Log In'}
             </span>
           </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
