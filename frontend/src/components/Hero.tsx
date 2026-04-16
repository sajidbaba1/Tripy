import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/30 blur-[100px] -z-10 animate-float" />

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content Area */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Discover Your Next <span className="text-brand">Adventure.</span>
          </h1>
          <p className="text-lg opacity-80 max-w-lg">
            Connect directly with world-class vendors. Premium stays, flights, and experiences customized just for you.
          </p>
          <div className="flex gap-4 mt-4">
            <button className="px-8 py-3 rounded-full bg-brand text-white font-bold hover:shadow-lg hover:shadow-brand/50 transition-all">
              Explore Trips
            </button>
            <button className="px-8 py-3 rounded-full glass-card font-bold hover:bg-white/20 transition-all text-brand-dark dark:text-brand-light">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Feature Image Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[500px]"
        >
           {/* Placeholder for the glossy hero image */}
           <div className="w-full h-full rounded-3xl object-cover shadow-2xl bg-gradient-to-br from-gray-200 to-gray-400 dark:from-slate-800 dark:to-slate-900 border-4 border-white/10" />
           
           {/* Floating Nano Banana Icon / Badge */}
           <motion.div 
             className="absolute -bottom-6 -left-6 px-6 py-4 glass-card text-xl font-bold rounded-2xl flex items-center gap-3 animate-float"
           >
             🍌 <span className="text-sm">Nano Verified</span>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
