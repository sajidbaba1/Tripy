import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  isPositive?: boolean;
}

export default function StatCard({ title, value, icon, trend, isPositive }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, translateY: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="glass-card p-6 flex flex-col justify-between h-40 relative overflow-hidden group"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/10 rounded-full blur-2xl group-hover:bg-brand/20 transition-all" />

      <div className="flex justify-between items-start">
        <h3 className="text-gray-500 dark:text-gray-400 font-semibold text-sm">{title}</h3>
        <span className="text-2xl opacity-80">{icon}</span>
      </div>
      
      <div className="mt-4 flex items-end justify-between">
        <p className="text-4xl font-black">{value}</p>
        
        {trend && (
          <div className={`flex items-center text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '↑' : '↓'} {trend}
          </div>
        )}
      </div>
    </motion.div>
  );
}
