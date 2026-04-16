import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-brand-dark dark:text-brand-light bg-brand-light dark:bg-brand-dark transition-colors duration-300">
        {/* The Navbar runs globally outside the Router, so it never unmounts! */}
        <Navbar />
        
        {/* Main Application Routes */}
        <main className="pt-20">
          <AppRoutes />
        </main>
        
        {/* Global Toastify Notifications Container */}
        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </BrowserRouter>
  );
}
