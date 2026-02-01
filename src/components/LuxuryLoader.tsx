import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LOADING_PHASES = [
    "Awakening Tradition",
    "Sourcing Premium Spices",
    "Handcrafting Excellence",
    "The Royal Taste of Lahore",
    "Finalizing Perfection"
];

export function LuxuryLoader({ onComplete, assetsLoaded = false }: { onComplete: () => void, assetsLoaded?: boolean }) {
    const [progress, setProgress] = useState(0);
    const [phaseIndex, setPhaseIndex] = useState(0);

    useEffect(() => {
        // Minimum visual duration
        const duration = 4000; // Slightly faster base time, effectively waits for assets
        const interval = 30;
        const step = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                // Determine target progress based on assetsLoaded
                // If assets are NOT loaded, we stall at 90%
                const stallPoint = 95;

                let next = prev + step;

                if (!assetsLoaded && next >= stallPoint) {
                    return stallPoint; // Wait here
                }

                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500); // Quick fade out
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete, assetsLoaded]);

    useEffect(() => {
        const phaseDuration = 6000 / LOADING_PHASES.length;
        const interval = setInterval(() => {
            setPhaseIndex((prev) => (prev < LOADING_PHASES.length - 1 ? prev + 1 : prev));
        }, phaseDuration);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-[#1a1614] flex flex-col items-center justify-center overflow-hidden">
            {/* Background radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.15)_0%,transparent_70%)]"></div>

            {/* Premium Silk Texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>

            {/* Decorative Corner Borders */}
            <div className="absolute top-10 left-10 w-24 h-24 border-t border-l border-amber-700/50"></div>
            <div className="absolute top-10 right-10 w-24 h-24 border-t border-r border-amber-700/50"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l border-amber-700/50"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r border-amber-700/50"></div>

            <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-8">
                {/* Animated Brand Identity */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 text-center"
                >
                    <div className="inline-block relative">
                        <h1 className="brand-font text-6xl lg:text-8xl bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 bg-clip-text text-transparent tracking-tighter filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                            Lahori Samosa
                        </h1>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 1.5 }}
                            className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                        />
                    </div>
                    <p className="mt-8 text-amber-500 text-[10px] lg:text-[12px] uppercase tracking-[0.6em] font-medium shadow-black drop-shadow-sm">
                        The Gold Standard of Tradition
                    </p>
                </motion.div>

                {/* Liquid Progress Container */}
                <div className="w-full space-y-6">
                    <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                        {/* Shimmering Liquid Gold Bar */}
                        <motion.div
                            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 relative shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                            style={{ width: `${progress}%` }}
                            initial={{ width: "0%" }}
                        />
                        {/* Glossy Overlay */}
                        <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                        />
                    </div>

                    {/* Phase Meta-info */}
                    <div className="flex justify-between items-end h-8">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={phaseIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-amber-300 text-[13px] uppercase tracking-[0.2em] font-semibold drop-shadow-md"
                            >
                                {LOADING_PHASES[phaseIndex]}
                            </motion.span>
                        </AnimatePresence>
                        <span className="text-amber-300 brand-font text-2xl italic font-bold tabular-nums drop-shadow-md">
                            {Math.round(progress)}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Aesthetic Est. Tag */}
        </div>
    );
}
