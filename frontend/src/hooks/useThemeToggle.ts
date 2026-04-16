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
