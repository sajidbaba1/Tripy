# YouTube Masterclass Lesson 22: Tripy Global Dark Mode Architecture

## Instructor Opening Script (To Camera)
"Welcome back! Throughout Phase 1 and 2, every single time we wrote a Tailwind CSS class, we utilized the `dark:bg-brand-dark` prefix. We wrote hundreds of lines of code anticipating a dark theme. But at this moment, the user is completely trapped in Light Mode. 

Today we write our first custom global React Hook. We are going to permanently hijack the browser's DOM element, attach a Dark Mode toggle to our primary Navbar, and save the user's preference natively inside their browser's Local Storage so they don't get flash-banged every time they refresh!"

---

## Part 1: Writing the DOM Hijacking Hook

### Instructor Script (Screen Recording VS Code)
"To control Dark Mode in Tailwind, React literally has to mutate the physical `<html class="dark">` wrapping the entire DOM. Here is how we build a reusable hook to orchestrate that process."

### Code to Type (`frontend/src/hooks/useThemeToggle.ts`)
"Inside `src`, create a new folder called `hooks`. Add a file named `useThemeToggle.ts`:"

```typescript
import { useEffect, useState } from 'react';

export function useThemeToggle() {
  // 1. Check local storage FIRST, default to 'light' if empty
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    // 2. The DOM Mutator! We physically grab the <html> tag
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // 3. Persist the memory into the browser so refreshes survive
    localStorage.setItem('theme', theme);
  }, [theme]); // Run this effect EVERY time the theme toggles

  // Safe wrapper function to swap the state natively
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
```

### Explanation for the Audience:
"The elegance of custom Hooks is unbelievable. Whenever any component in our application calls `useThemeToggle()`, React fires the `useEffect`. It reaches completely outside the React Sandbox using `window.document.documentElement` and forcefully attaches the strict string `'dark'` to the classList! This triggers Tailwind's Dark classes globally across all pages instantaneously."

---

## Part 2: Installing the Global Switch

### Instructor Script
"Our global hook is primed. Now we just need to give the User physical access to it. We will open our `Navbar.tsx` component and mount a beautiful Sun and Moon toggle switch right next to the user login buttons!"

### Code to Type (`frontend/src/components/Navbar.tsx`)
"Open up `Navbar.tsx` and integrate the hook exactly like this:"

```tsx
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
```

### Explanation for the Audience:
"With literally one line of code (`const { theme, toggleTheme } = useThemeToggle()`), we successfully injected the entire DOM-tracking logic into our Navbar! Notice how the button literally checks the `theme` variable structure to conditionally flip the emoji from a Sun `☀️` to a Moon `🌙`. Go ahead and click it—the entire Phase 1 Landing Page, the Phase 2 Dashboards, and the Phase 3 Catalog will invert their colors aggressively and gorgeously!"

---

## Instructor Outro (To Camera)
"Our Tripy aesthetics are fully deployed. The UI is completely responsive and the memory states hold across reloads. 

However, right now our Customer Checkout functionality is just an empty button string. In our ultimate culminating video, we write fake backend logic simulating Stripe payments, generate beautiful Downloadable Receipts for our customers using Blob objects, and put the final stamp of approval on Tripy! See you there!"
