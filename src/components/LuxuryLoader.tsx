import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function LuxuryLoader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 6000; // 6 seconds
        const interval = 50;
        const step = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500); // Small delay before finishing
                    return 100;
                }
                return prev + step;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[9999] bg-[#121111] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Texture/Grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>

            {/* Logo/Brand Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="mb-12 text-center"
            >
                <h1 className="brand-font text-5xl lg:text-7xl text-amber-500/90 tracking-tighter mb-2">
                    Lahori Samosa
                </h1>
                <p className="text-amber-600/50 text-xs uppercase letter-spacing-[0.5em] font-light tracking-[0.3em]">
                    Authentic • Premium • Fresh
                </p>
            </motion.div>

            {/* Loading Container */}
            <div className="w-64 lg:w-96 relative">
                {/* Track */}
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                    {/* Shimmering Gold Progress Bar */}
                    <motion.div
                        className="h-full bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 relative"
                        style={{ width: `${progress}%` }}
                        initial={{ width: "0%" }}
                    >
                        {/* Shimmer Effect */}
                        <motion.div
                            animate={{
                                x: ['-100%', '100%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                    </motion.div>
                </div>

                {/* Percentage Indicator */}
                <div className="mt-4 flex justify-between items-center text-[10px] uppercase tracking-widest font-medium">
                    <span className="text-amber-600/40">Loading Excellence</span>
                    <span className="text-amber-500/80">{Math.round(progress)}%</span>
                </div>
            </div>

            {/* Subtle Bottom Accent */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 2 }}
                className="absolute bottom-12 text-white/10 text-[10px] uppercase tracking-[0.4em]"
            >
                Est. Lahore 1996
            </motion.div>
        </div>
    );
}
