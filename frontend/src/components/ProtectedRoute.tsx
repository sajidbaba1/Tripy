import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuthStore();

  // 1. If not logged in at all, kick them to the root landing page
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // 2. If the route requires specific roles (e.g., Only Admins)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. User is valid and authorized, render the requested Dashboard
  return <Outlet />;
}
