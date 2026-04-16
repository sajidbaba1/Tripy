import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeToggle } from '../hooks/useThemeToggle';

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  
  // Destructure our custom Hook!
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass-card px-8 md:px-16 py-4 flex justify-between items-center bg-white/70 dark:bg-brand-dark/70 transition-colors duration-300">
        
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-black heading-clip cursor-pointer flex items-center gap-2">
           <span className="text-3xl">🍌</span> Tripy
        </Link>
        
        {/* Middle Navigation Links */}
        <div className="hidden md:flex gap-8 font-bold text-gray-600 dark:text-gray-300">
          <Link to="/destinations" className="hover:text-brand transition-colors">Destinations</Link>
          <a href="#" className="hover:text-brand transition-colors">Tripy Business</a>
          <a href="#" className="hover:text-brand transition-colors">Resources</a>
        </div>
        
        {/* Auth & Theme Toggle Area */}
        <div className="flex items-center gap-4">
          
          {/* THE THEME TOGGLE BUTTON */}
          <motion.button 
             whileTap={{ scale: 0.8 }}
             onClick={toggleTheme}
             className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xl shadow-inner border border-gray-300 dark:border-gray-600 focus:outline-none"
             title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
             {theme === 'light' ? '🌙' : '☀️'}
          </motion.button>

          {isAuthenticated && user ? (
             <div className="flex gap-4 items-center pl-4 border-l border-gray-400/30">
               <span className="font-bold text-sm bg-brand text-white px-3 py-1 pb-1.5 rounded-full">
                 Hi, {user.username}
               </span>
               <Link to="/portal" className="font-bold text-gray-500 hover:text-brand transition-colors text-sm">Dashboard</Link>
               <button onClick={logout} className="font-bold text-red-500 hover:opacity-70 transition-opacity text-sm">Logout</button>
             </div>
          ) : (
             <button 
               onClick={() => setIsAuthOpen(true)}
               className="px-6 py-2 pb-2.5 rounded-full bg-brand text-white font-bold hover:shadow-lg hover:shadow-brand/50 transition-all ml-4"
             >
               Sign In
             </button>
          )}
        </div>
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
