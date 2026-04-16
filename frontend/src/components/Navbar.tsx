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
