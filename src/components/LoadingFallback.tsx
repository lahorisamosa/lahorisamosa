import { motion } from 'motion/react';

export function LoadingFallback() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative w-20 h-20">
          <motion.div
            className="absolute inset-0 border-4 border-amber-100 rounded-full"
            style={{ borderTopColor: 'transparent' }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-amber-600 rounded-full border-t-transparent"
          />
        </div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-amber-800 font-medium tracking-wider text-sm uppercase"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}
