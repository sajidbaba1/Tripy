import { Routes, Route } from 'react-router-dom';
import Hero from '../components/Hero';
import DashboardLayout from '../layouts/DashboardLayout';
import BusinessDashboard from '../pages/BusinessDashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import Catalog from '../pages/Catalog';
import TripWizard from '../pages/business/TripWizard';
import TripDetails from '../pages/TripDetails';
import SuperAdminDashboard from '../pages/SuperAdminDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      
      {/* PUBLIC ROUTES (No Auth Required) */}
      <Route path="/" element={<Hero />} />
      <Route path="/destinations" element={<Catalog />} />
      <Route path="/trip/:id" element={<TripDetails />} />
      
      {/* PROTECTED ROUTES (Requires Login) */}
      <Route element={<ProtectedRoute />}>
        
        {/* The DashboardLayout wrapper houses the sidebar */}
        <Route path="/portal" element={<DashboardLayout />}>
          
          <Route index element={
            <div className="text-center p-20">Welcome to your Portal! Select an option from the sidebar.</div>
          } />

          {/* Business Specific Dashboard Route */}
          <Route element={<ProtectedRoute allowedRoles={['BUSINESS']} />}>
             <Route path="business" element={<BusinessDashboard />} />
             <Route path="business/new-trip" element={<TripWizard />} />
          </Route>

          {/* Admin Specific Dashboard Route */}
          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']} />}>
             <Route path="admin" element={<SuperAdminDashboard />} />
          </Route>

        </Route>

      </Route>
      
      {/* 404 Catch All */}
      <Route path="*" element={<div className="flex h-screen items-center justify-center font-bold text-3xl">404 - Page Not Found🍌</div>} />
      
    </Routes>
  );
}
