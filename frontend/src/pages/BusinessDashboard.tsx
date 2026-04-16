import { motion } from 'framer-motion';
import StatCard from '../components/ui/StatCard';
import { useAuthStore } from '../store/useAuthStore';

export default function BusinessDashboard() {
  const { user } = useAuthStore();

  const staggerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black mb-2">Welcome back, {user?.username || 'Vendor'} 👋</h1>
        <p className="opacity-60">Here is what's happening with your trip listings today.</p>
      </div>

      {/* Quick Action Grid */}
      <motion.div 
        variants={staggerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        <motion.div variants={itemVariants}>
          <StatCard title="Total Earnings" value="$14,203" icon="💸" trend="+12.5%" isPositive={true} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard title="Active Listings" value="8" icon="🌴" trend="+2" isPositive={true} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard title="Pending Bookings" value="14" icon="📅" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard title="Customer Rating" value="4.9" icon="⭐" trend="-0.1" isPositive={false} />
        </motion.div>
      </motion.div>

      {/* Overflow Table Panel Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-8 h-96 flex items-center justify-center border-t-4 border-brand"
      >
        <h2 className="text-2xl font-bold opacity-30 animate-pulse">
           [ Data Table: Recent Customer Inquiries will render here... ]
        </h2>
      </motion.div>

    </div>
  );
}
