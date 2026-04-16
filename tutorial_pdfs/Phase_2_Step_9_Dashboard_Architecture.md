# YouTube Masterclass Lesson 9: Dynamic Role-Based Dashboards

## Instructor Opening Script (To Camera)
"Welcome to Phase 2 of Tripy! Over the last 8 lessons, we forged an unbreakable authentication fortress. We have JWTs, Spring Security, Zustand memory stores, and Axios interceptors perfectly synced.

Now it's time to actually build the application our users will live inside. Today, we are creating a dynamic `DashboardLayout`. Depending on whether the logged-in user is an Admin, a Business Vendor, or a Customer, this global layout will morph its Sidebar and provide 'Quick Action' buttons completely unique to their Role permissions. Let's write the code."

---

## Part 1: Constructing the Layout Wrapper

### Instructor Script (Screen Recording VS Code)
"We don't want to copy and paste a Sidebar on 50 different pages. Instead, we use React Router's `<Outlet />` element to create a foundational layout shell. Look closely at how we use Framer Motion to make our Sidebar slide seamlessly into view."

### Code to Type (`frontend/src/layouts/DashboardLayout.tsx`)
"In your `src` directory, create a new folder called `layouts`, and craft `DashboardLayout.tsx`:"

```tsx
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate, Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  // Guard Clause to prevent unauthenticated access
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
         <h2 className="text-2xl font-bold animate-pulse">Authenticating Portal...</h2>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-brand-light dark:bg-brand-dark overflow-hidden">
      
      {/* Dynamic Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 glass-card rounded-none border-y-0 border-l-0 flex flex-col justify-between"
      >
        <div className="p-6">
          <h2 className="text-2xl font-black bg-gradient-to-r from-brand to-purple-500 bg-clip-text text-transparent mb-8">
            Tripy Portal
          </h2>
          
          <nav className="flex flex-col gap-3 font-semibold opacity-80">
            {/* Conditional Rendering based on Role */}
            {user.role === 'SUPER_ADMIN' && (
              <>
                <a href="#" className="p-3 bg-brand/10 rounded-lg text-brand hover:bg-brand/20 transition-all">Analytics Hub</a>
                <a href="#" className="p-3 rounded-lg hover:bg-gray-200/20 transition-all">User Management</a>
                <a href="#" className="p-3 rounded-lg hover:bg-gray-200/20 transition-all">Review Business Apps</a>
              </>
            )}

            {user.role === 'BUSINESS' && (
              <>
                <a href="#" className="p-3 bg-brand/10 rounded-lg text-brand hover:bg-brand/20 transition-all">My Listings</a>
                <a href="#" className="p-3 rounded-lg hover:bg-gray-200/20 transition-all">Negotiation Chat</a>
                <a href="#" className="p-3 rounded-lg hover:bg-gray-200/20 transition-all">Earnings Wallet</a>
              </>
            )}

            {user.role === 'CUSTOMER' && (
              <>
                <a href="#" className="p-3 bg-brand/10 rounded-lg text-brand hover:bg-brand/20 transition-all">My Bookings</a>
                <a href="#" className="p-3 rounded-lg hover:bg-gray-200/20 transition-all">Saved Favorites</a>
              </>
            )}
          </nav>
        </div>

        {/* Unified Profile & Logout Area */}
        <div className="p-6 border-t border-gray-200/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">
               {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-sm">{user.username}</p>
              <p className="text-xs opacity-60 uppercase">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full p-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all"
          >
            Log Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area populated by React Router */}
      <main className="flex-1 overflow-y-auto p-10 relative">
        <Outlet />
      </main>

    </div>
  );
}
```

### Explanation for the Audience:
"React developers, take notes here. We are importing `useAuthStore` to access the exact role of the user (e.g., `BUSINESS`). By using simple JavaScript conditionals (`user.role === 'SUPER_ADMIN'`), our Sidebar magically shape-shifts. An Admin will see global analytic tools, while a Vendor will only see tools related to their earnings and package listings. 

Also, notice the `<Outlet />` component sitting inside the `<main>` tag. This is where React Router will swap out the actual dashboard page content without fully reloading the page!"

---

## Instructor Outro (To Camera)
"Our application is truly scaling up. The structural shell for our multi-role system is complete, fully animated, and gorgeous. 

In our next massive video, we are building the actual 'Quick Action' Dashboard grid using a glossy Card-Based Design. We will construct beautiful Analytics charts, floating overflow cards, and integrate a real wallet UI! Make sure you are subscribed so you don't miss that build."
