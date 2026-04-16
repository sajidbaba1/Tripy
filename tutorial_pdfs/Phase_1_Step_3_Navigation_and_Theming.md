# YouTube Masterclass Lesson 3: The Ultimate Responsive Navbar & Theming

## Instructor Opening Script (To Camera)
"Welcome back! In our previous lesson, we built an incredible Framer Motion-powered Hero section. But no professional web application is complete without a top-tier navigation system. 

Today in our Tripy Masterclass, we are building our global Navigation Bar. This Navbar will lock onto the top of the screen with a frosted glass effect, it will include our Dark Mode toggle logic, and it will lay the groundwork for our Role-Based Auth buttons (Admin, Business, Customer). Let's dive in!"

---

## Part 1: Managing Theme State Global Logic

### Instructor Script (Screen Recording VS Code)
"Before we build the visuals, we need the logic to click a button and instantly switch the entire app between Dark and Light mode. Let's create a custom React hook for this to keep our components clean."

### Code to Type (`frontend/src/hooks/useTheme.ts`)
"Create a new folder in `src` called `hooks`, and inside it, create `useTheme.ts`:"

```typescript
import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check system preference or localStorage on load
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  };

  return { theme, toggleTheme };
}
```

### Explanation for the Audience:
"This hook is simple but powerful. It checks your operating system's default preference when the app loads, and dynamically injects the `.dark` class directly into the HTML root element. Since we set up our global background colors in `index.css` earlier, this instantly shifts the whole application palette!"

---

## Part 2: Building the Navbar Component

### Instructor Script
"Now for the UI. Let's head over to the `components` directory and craft `Navbar.tsx`. We are bringing in Lucide or Nano Icons—and taking full advantage of the glass-card class we wrote in lesson two."

### Code to Type (`frontend/src/components/Navbar.tsx`)
```tsx
import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full top-0 z-50 transition-all duration-300 glass-card rounded-none border-t-0 border-x-0 border-b border-gray-200/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-3xl font-black bg-gradient-to-r from-brand to-purple-500 bg-clip-text text-transparent">
            Tripy
          </span>
          <span className="text-2xl animate-pulse">🍌</span>
        </div>

        {/* Center Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 font-semibold opacity-80">
          <a href="#" className="hover:text-brand transition-colors">Destinations</a>
          <a href="#" className="hover:text-brand transition-colors">Business Setup</a>
          <a href="#" className="hover:text-brand transition-colors">Support</a>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-500/10 transition-colors pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-3">
            <button className="px-5 py-2 font-bold hover:text-brand transition-colors">
              Log In
            </button>
            <button className="px-5 py-2 rounded-full bg-brand text-white font-bold hover:shadow-lg hover:shadow-brand/50 transition-all">
              Sign Up
            </button>
          </div>

          {/* Mobile Hamburger placeholder */}
          <button className="md:hidden text-2xl">
            ☰
          </button>

        </div>
      </div>
    </nav>
  );
}
```

### Explanation for the Audience:
"We made sure to define our navbar as `fixed` with `z-50` so it permanently floats above our app. We reused our custom `glass-card` class, removed its default borders, and let the gradient branding pop! We also embedded our new `useTheme` hook directly to a sun/moon icon toggle."

---

## Part 3: Injecting the Navbar into `App.tsx`

### Instructor Script
"Alright, last step. We need to actually put this Navbar into our app layout."

### Code to Type (`frontend/src/App.tsx`)
*Replace your App component to look like this:*

```tsx
import Hero from './components/Hero';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20"> {/* Add padding for the fixed navbar */}
        <Hero />
      </main>
    </div>
  );
}

export default App;
```

## Instructor Outro (To Camera)
"Test the app out! Scroll down, watch how the Hero image passes smoothly beneath the transparent frosted glass of the Navbar. Click that Sun/Moon icon—boom, instant dark mode across your entire ecosystem. 

In our next video, we are leaving the UI for a second to dive into the Spring Boot Backend to set up our PostgreSQL entities, Role definitions, and the JWT Authentication architecture so our 'Log In' buttons actually work!"
