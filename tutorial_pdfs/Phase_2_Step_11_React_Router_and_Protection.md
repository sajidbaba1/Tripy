# YouTube Masterclass Lesson 11: The Ultimate Navigation Architecture (React Router)

## Instructor Opening Script (To Camera)
"Welcome back! At this exact moment, we have beautiful landing pages, and we have stunning dynamic dashboards. But they are completely disconnected. 

Today is the day we orchestrate the entire platform. We are going to implement `React Router v6`. We will create a routing map that handles public URLs, and more importantly, we will build a `ProtectedRoute` wrapper component. This wrapper acts as a Frontend Bodyguard—if an unauthenticated user tries to sneak into `/dashboard`, our router will physically reject them and boot them back to the login screen! Let's wire it up."

---

## Part 1: Establishing the Frontend Bodyguard

### Instructor Script (Screen Recording VS Code)
"We need a component that wraps around our private pages. Before it renders the child content, it will ping our `Zustand` store. If the `isAuthenticated` payload is missing, it redirects using `Navigate`."

### Code to Type (`frontend/src/components/ProtectedRoute.tsx`)
"Create `ProtectedRoute.tsx` in your `components` folder:"

```tsx
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
```

### Explanation for the Audience:
"This is Enterprise-grade security logic on the frontend. Not only does it check if you are logged in, but it accepts an `allowedRoles` array. Now, we can theoretically protect a `/admin` route so even if a 'Customer' is fully logged in, they are still rejected! It is a double-layered authorization wall!"

---

## Part 2: The Master App Router Map

### Instructor Script
"Now we build the map. We take the Public Layout (Navbar + Hero) and the Private Layout (Dashboard Frame) and put them in their own separate routing trees."

### Code to Type (`frontend/src/routes/AppRoutes.tsx`)
"In `src`, create a new folder named `routes` and add `AppRoutes.tsx`:"

```tsx
import { Routes, Route } from 'react-router-dom';
import Hero from '../components/Hero';
import DashboardLayout from '../layouts/DashboardLayout';
import BusinessDashboard from '../pages/BusinessDashboard';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      
      {/* PUBLIC ROUTES (No Auth Required) */}
      <Route path="/" element={<Hero />} />
      <Route path="/destinations" element={<div className="p-20 text-center">Public Trips Catalog Here</div>} />
      
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
          </Route>

          {/* Admin Specific Dashboard Route (Coming Soon) */}
          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']} />}>
             <Route path="admin" element={<div className="p-20">Admin Analytics Shell...</div>} />
          </Route>

        </Route>

      </Route>
      
      {/* 404 Catch All */}
      <Route path="*" element={<div className="flex h-screen items-center justify-center font-bold text-3xl">404 - Page Not Found🍌</div>} />
      
    </Routes>
  );
}
```

### Explanation for the Audience:
"By writing an `AppRoutes` matrix, we isolated the `DashboardLayout` from the `Hero` page. The `<Routes>` tree reads from top to bottom. If someone successfully logs in and the app pushes them to `/portal/business`, React first runs it through our `ProtectedRoute`, validates the 'BUSINESS' JWT claim, mounts the `DashboardLayout` Sidebar, and finally renders our massive Card Grid. Beautiful."

---

## Part 3: Injecting the Router into App.tsx

### Instructor Script
"Last step for today. Let's head over to `App.tsx` and totally replace our old hardcoded placeholder code."

### Code to Type (`frontend/src/App.tsx`)
```tsx
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-brand-dark dark:text-brand-light">
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
```

## Instructor Outro (To Camera)
"Our entire Tripy ecosystem is finally united. 

We can now cleanly navigate from the marketing Landing Pages, trigger the Auth Modal, hit the Spring Boot API, and successfully inject the user into the massive, role-gated private Dashboards! Everything is fully routed. In our next session, we hit Phase 3: The Core Domain... **Trip Packages & Bookings**! I will see you then!"
