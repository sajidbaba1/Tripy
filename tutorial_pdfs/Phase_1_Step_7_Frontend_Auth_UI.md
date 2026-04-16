# YouTube Masterclass Lesson 7: The Glassmorphic Auth Modal & Zustand State

## Instructor Opening Script (To Camera)
"Welcome back developers! In our last two lessons, we built a fortress inside Spring Boot, managing our Custom JWT generation and password encoding. 

Now, we bring the magic back to the user. Today, we are building a stunning, animated 'Auth Modal' popup using Framer Motion and Tailwind. We will also initialize `Zustand` to manage our global authentication state across the entire application. Let's make login beautiful."

---

## Part 1: Setting up the Auth State (Zustand)

### Instructor Script (Screen Recording VS Code)
"Instead of passing user props down continuously through dozens of files, we need a global vault. We use `zustand` because it completely eliminates Redux boilerplate. Let's create our store."

### Code to Type (`frontend/src/store/useAuthStore.ts`)
"Inside `src`, create a directory called `store`, and then create `useAuthStore.ts`:"

```typescript
import { create } from 'zustand';

interface AuthState {
  user: any | null;       // Placeholder for our JWT Payload
  isAuthenticated: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (userData) => {
    // We will save our JWT to localStorage here eventually
    set({ user: userData, isAuthenticated: true });
  },
  
  logout: () => {
    // Clear localStorage Token
    set({ user: null, isAuthenticated: false });
  }
}));
```

### Explanation for the Audience:
"With barely 20 lines of code, we just established our global auth layer. Any component across our entire app can now instantly know if `isAuthenticated` is true, or seamlessly trigger a `logout()`. We'll wire up Axios here shortly, but logic is locked in."

---

## Part 2: Building the Framer Motion Auth Modal

### Instructor Script
"When our user clicks 'Login' on the Navbar, we don't want to redirect them to an ugly, boring page. We want a frosted glass popup to elegantly float onto the screen. We are going back to Framer Motion."

### Code to Type (`frontend/src/components/AuthModal.tsx`)
"In your `components` folder, create `AuthModal.tsx`:"

```tsx
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
```

### Explanation for the Audience:
"The `AnimatePresence` wrapper is incredible. It allows our React components to physically animate *out* of existence before being removed from the DOM. We utilized our `.glass-card` class again for maximum UI conformity, and included a seamless toggle between forms `setIsLogin(!isLogin)`."

---

## Instructor Outro (To Camera)
"Our application is coming alive. We have our Zustand global memory store, and our popup aesthetic is totally locked in! Right now, that 'Sign In' button does nothing. 

In our next lesson, we are going to use Axios to hit the Spring Boot REST API we built. We will snatch the JSON Web Token, store it securely, and use it to update our UI globally using Zustand. Smash the subscribe button, and let's keep going!"
