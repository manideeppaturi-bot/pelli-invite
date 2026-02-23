"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Countdown } from "./Countdown";

const generateLanterns = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 90}%`,
        startY: `${Math.random() * 100}vh`, // Start randomly within the screen
        animationDuration: `${10 + Math.random() * 20}s`,
        delay: `0s`, // No delay, start immediately
        scale: 0.5 + Math.random() * 0.8,
        type: ["red_lantern", "diya", "flower", "orb", "red_lantern"][Math.floor(Math.random() * 5)], // Weighted slightly towards the new red lantern
    }));
};

export function Hero() {
    const [lanterns, setLanterns] = useState<{ id: number; left: string; startY: string; animationDuration: string; delay: string; scale: number }[]>([]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
            setLanterns(generateLanterns(35));
        }
        return () => { isMounted = false; };
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center overflow-hidden bg-[#FDF9D2]">

            {/* Deepest Background Texture */}
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/floral-motif.png')] pointer-events-none z-0" />

            {/* The Gopuram (Full Width Backdrop at the bottom) */}
            <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute bottom-0 left-0 w-full z-10 flex justify-center pointer-events-none"
            >
                {/* Made arch h-[65vh] on mobile so it pierces the wording */}
                <div className="relative w-[200vw] md:w-[120vw] max-w-[1800px] h-[65vh] md:h-[70vh] mix-blend-multiply">
                    <Image
                        src="/gopuram.png"
                        alt="Temple Gopuram"
                        fill
                        className="object-cover object-bottom md:object-contain"
                        priority
                    />
                </div>
            </motion.div>

            {/* Floating Lanterns (Mid-Background) */}
            <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
                {lanterns.map((lantern: any) => (
                    <motion.div
                        key={lantern.id}
                        initial={{ y: lantern.startY, opacity: 0 }}
                        animate={{ y: "-20vh", opacity: [0, 1, 1, 1, 0] }}
                        transition={{
                            duration: parseFloat(lantern.animationDuration),
                            repeat: Infinity,
                            delay: 0,
                            ease: "linear",
                        }}
                        className="absolute"
                        style={{ left: lantern.left, transform: `scale(${lantern.scale})` }}
                    >
                        {lantern.type === "red_lantern" && (
                            <div className="relative w-16 h-20 -ml-8 drop-shadow-[0_8px_16px_rgba(255,0,0,0.5)] opacity-90">
                                {/* Red Sky Lantern matching user reference */}
                                <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
                                    {/* Lantern Body (Red Gradient) */}
                                    <defs>
                                        <linearGradient id={`red-grad-${lantern.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#FF1744" />
                                            <stop offset="60%" stopColor="#D50000" />
                                            <stop offset="100%" stopColor="#FF8A80" />
                                        </linearGradient>
                                        <radialGradient id={`glow-${lantern.id}`} cx="50%" cy="85%" r="50%">
                                            <stop offset="0%" stopColor="#FFEA00" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#FF9100" stopOpacity="0" />
                                        </radialGradient>
                                    </defs>
                                    {/* Main Balloon Shape */}
                                    <path d="M 20 10 C 20 10, 50 -5, 80 10 C 95 20, 95 60, 80 90 L 65 105 C 55 110, 45 110, 35 105 L 20 90 C 5 60, 5 20, 20 10 Z" fill={`url(#red-grad-${lantern.id})`} stroke="#B71C1C" strokeWidth="1" />
                                    {/* Inner Glow from Flame */}
                                    <path d="M 20 10 C 20 10, 50 -5, 80 10 C 95 20, 95 60, 80 90 L 65 105 C 55 110, 45 110, 35 105 L 20 90 C 5 60, 5 20, 20 10 Z" fill={`url(#glow-${lantern.id})`} />
                                    {/* Base Wire Hoop */}
                                    <ellipse cx="50" cy="108" rx="16" ry="4" stroke="#00E5FF" strokeWidth="2" fill="none" />
                                    {/* Flame */}
                                    <path d="M 50 95 C 55 105, 50 110, 50 110 C 50 110, 45 105, 50 95 Z" fill="#FFC107" className="animate-pulse" />
                                    <path d="M 50 100 C 52 106, 50 108, 50 108 C 50 108, 48 106, 50 100 Z" fill="#FFF8E1" />
                                </svg>
                            </div>
                        )}

                        {lantern.type === "diya" && (
                            <div className="relative w-12 h-10 -ml-6 drop-shadow-[0_4px_10px_rgba(255,165,0,0.4)]">
                                {/* Traditional Clay Diya SVG */}
                                <svg viewBox="0 0 64 64" className="w-full h-full overflow-visible">
                                    <path d="M32 5 Q38 20 32 30 Q26 20 32 5 Z" fill="#FFC107" className="animate-pulse drop-shadow-[0_0_8px_rgba(255,200,0,0.8)]" />
                                    <path d="M32 12 Q35 20 32 26 Q29 20 32 12 Z" fill="#FFE082" />
                                    <path d="M10 30 Q32 55 54 30 Z" fill="#A03A21" />
                                    <path d="M10 30 Q32 40 54 30 Z" fill="#7D2915" />
                                    <circle cx="32" cy="30" r="16" fill="#CC4B2A" />
                                </svg>
                            </div>
                        )}

                        {lantern.type === "flower" && (
                            <div className="relative w-12 h-12 -ml-6 animate-[spin_12s_linear_infinite] drop-shadow-md opacity-90">
                                {/* Orange/Yellow Marigold SVG */}
                                <svg viewBox="0 0 64 64" className="w-full h-full">
                                    <circle cx="32" cy="32" r="28" fill="#F57C00" />
                                    <circle cx="32" cy="32" r="20" fill="#FF9800" />
                                    <circle cx="32" cy="32" r="12" fill="#FFC107" />
                                    <path d="M32 4 L32 60 M4 32 L60 32 M12 12 L52 52 M12 52 L52 12" stroke="#E65100" strokeWidth="3" strokeDasharray="2 6" className="opacity-50" />
                                    <circle cx="32" cy="32" r="4" fill="#FFEB3B" />
                                </svg>
                            </div>
                        )}

                        {lantern.type === "orb" && (
                            <div className="w-8 h-8 -ml-4 rounded-full bg-gradient-to-tr from-yellow-200 to-orange-400 blur-[3px] opacity-70 shadow-[0_0_20px_rgba(255,200,0,0.9)]" />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Peeking Gods (Right edge - Enlarged and Animated) */}
            <motion.div
                initial={{ x: 150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="absolute bottom-0 right-0 z-40 pointer-events-none mix-blend-multiply w-[140px] sm:w-[150px] md:w-[350px] lg:w-[400px] h-[40%] sm:h-[45%] md:h-[60%] translate-x-[20%] md:translate-x-0"
            >
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="/gods.png"
                        alt="Hindu Gods"
                        fill
                        className="object-contain object-right-bottom"
                        priority
                    />
                </motion.div>
            </motion.div>

            {/* Main Text (Center Foreground) */}
            <div className="relative z-30 flex flex-col items-center justify-start pt-[12vh] sm:pt-[12vh] md:pt-[15vh] lg:pt-[15vh] w-full pointer-events-none drop-shadow-sm">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="uppercase tracking-[0.4em] text-xs md:text-sm text-[#CF2F2A] font-sans font-bold mb-4"
                >
                    The Wedding Of
                </motion.span>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                    className="text-center w-full px-4 relative z-10 flex flex-col items-center justify-center"
                >
                    {/* Organic Glow Behind Text for Perfect Legibility */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FDF9D2] via-[#FDF9D2]/70 to-transparent blur-2xl -z-10 scale-[1.5] w-full h-[140%]" />

                    <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-serif text-[#CF2F2A] uppercase tracking-wider leading-none drop-shadow-md">
                        Manideep
                    </h1>
                    <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-serif text-[#CF2F2A] uppercase leading-none drop-shadow-md py-2 md:py-4">
                        &
                    </h1>
                    <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-serif text-[#CF2F2A] uppercase tracking-wider leading-none drop-shadow-md">
                        Supriya
                    </h1>
                </motion.div>

                {/* Countdown Positioned so it doesn't overlap faces or text unreadably */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="pointer-events-auto mt-8 md:mt-12 bg-[#FDF9D2]/90 backdrop-blur-md px-4 py-4 md:px-8 md:py-6 rounded-3xl border border-[#E79300]/30 shadow-xl"
                >
                    <Countdown targetDate="2026-05-03T09:00:00" />
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center"
            >
                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#CF2F2A] mb-2 font-sans opacity-90 mix-blend-multiply">Scroll to enter</p>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#CF2F2A] to-transparent animate-pulse" />
            </motion.div>
        </div>
    );
}
