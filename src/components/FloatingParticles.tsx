"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingParticlesProps {
    count?: number;
}

interface LanternData {
    id: number;
    left: string;
    startY: string;
    animationDuration: string;
    delay: string;
    scale: number;
    orbitDuration?: string;
    type: string;
}

export function FloatingParticles({ count = 10 }: FloatingParticlesProps) {
    const [lanterns, setLanterns] = useState<LanternData[]>([]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            const isMobile = window.innerWidth < 768;
            const finalCount = isMobile ? Math.floor(count * 2) : count;

            const generated = Array.from({ length: finalCount }).map((_, i) => {
                let leftPercent = Math.random() * 100;
                // 80% chance to spawn on the side edges
                if (Math.random() < 0.8) {
                    leftPercent = Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
                }

                return {
                    id: i,
                    left: `${leftPercent}%`,
                    startY: `${Math.random() * 100}%`,
                    animationDuration: `${10 + Math.random() * 15}s`,
                    delay: `${Math.random() * 5}s`,
                    scale: 0.5 + Math.random() * 0.6,
                    orbitDuration: `${15 + Math.random() * 10}`,
                    type: ["orange_lantern", "flower", "orb"][Math.floor(Math.random() * 3)],
                };
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setLanterns(generated);
        }
        return () => { isMounted = false; };
    }, [count]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {lanterns.map((lantern: LanternData) => (
                <div key={lantern.id}>
                    {lantern.type === "orange_lantern" && (
                        <motion.div
                            initial={{ y: "110%", opacity: 0 }}
                            animate={{ y: "-20%", opacity: [0, 1, 1, 1, 0] }}
                            transition={{
                                duration: parseFloat(lantern.animationDuration),
                                repeat: Infinity,
                                delay: parseFloat(lantern.delay),
                                ease: "linear",
                            }}
                            className="absolute"
                            style={{ left: lantern.left, transform: `scale(${lantern.scale})`, top: "0" }}
                        >
                            <div className="relative w-14 h-16 -ml-7 drop-shadow-[0_8px_16px_rgba(255,152,0,0.5)] opacity-80">
                                <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
                                    <defs>
                                        <linearGradient id={`orange-grad-${lantern.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#FFAB00" />
                                            <stop offset="60%" stopColor="#FF6D00" />
                                            <stop offset="100%" stopColor="#FFCC80" />
                                        </linearGradient>
                                        <radialGradient id={`glow-${lantern.id}`} cx="50%" cy="85%" r="50%">
                                            <stop offset="0%" stopColor="#FFEA00" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#FF9100" stopOpacity="0" />
                                        </radialGradient>
                                    </defs>
                                    <path d="M 20 10 C 20 10, 50 -5, 80 10 C 95 20, 95 60, 80 90 L 65 105 C 55 110, 45 110, 35 105 L 20 90 C 5 60, 5 20, 20 10 Z" fill={`url(#orange-grad-${lantern.id})`} stroke="#E65100" strokeWidth="1" />
                                    <path d="M 20 10 C 20 10, 50 -5, 80 10 C 95 20, 95 60, 80 90 L 65 105 C 55 110, 45 110, 35 105 L 20 90 C 5 60, 5 20, 20 10 Z" fill={`url(#glow-${lantern.id})`} />
                                    <ellipse cx="50" cy="108" rx="16" ry="4" stroke="#FFD180" strokeWidth="2" fill="none" />
                                    <path d="M 50 95 C 55 105, 50 110, 50 110 C 50 110, 45 105, 50 95 Z" fill="#FFC107" className="animate-pulse" />
                                    <path d="M 50 100 C 52 106, 50 108, 50 108 C 50 108, 48 106, 50 100 Z" fill="#FFF8E1" />
                                </svg>
                            </div>
                        </motion.div>
                    )}

                    {lantern.type === "flower" && (
                        <motion.div
                            initial={{ y: lantern.startY, opacity: 0 }}
                            animate={{ opacity: [0, 0.6, 0.8, 0.6, 0] }}
                            transition={{
                                duration: parseFloat(lantern.animationDuration) * 0.8,
                                repeat: Infinity,
                                delay: parseFloat(lantern.delay),
                                ease: "easeInOut",
                            }}
                            className="absolute"
                            style={{ left: lantern.left, top: lantern.startY, transform: `scale(${lantern.scale})` }}
                        >
                            <div className="relative w-10 h-10 -ml-5 animate-[spin_12s_linear_infinite] drop-shadow-sm opacity-80">
                                <svg viewBox="0 0 64 64" className="w-full h-full">
                                    <circle cx="32" cy="32" r="28" fill="#F57C00" />
                                    <circle cx="32" cy="32" r="20" fill="#FF9800" />
                                    <circle cx="32" cy="32" r="12" fill="#FFC107" />
                                    <path d="M32 4 L32 60 M4 32 L60 32 M12 12 L52 52 M12 52 L52 12" stroke="#E65100" strokeWidth="3" strokeDasharray="2 6" className="opacity-50" />
                                    <circle cx="32" cy="32" r="4" fill="#FFEB3B" />
                                </svg>
                            </div>
                        </motion.div>
                    )}

                    {lantern.type === "orb" && (
                        <motion.div
                            initial={{ y: lantern.startY, opacity: 0 }}
                            animate={{ opacity: [0, 0.4, 0.6, 0.4, 0] }}
                            transition={{
                                duration: parseFloat(lantern.animationDuration) * 0.6,
                                repeat: Infinity,
                                delay: parseFloat(lantern.delay),
                                ease: "easeInOut",
                            }}
                            className="absolute"
                            style={{ left: lantern.left, top: lantern.startY, transform: `scale(${lantern.scale})` }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: parseFloat(lantern.orbitDuration || "20"), repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 flex items-start justify-start origin-center -ml-12 -mt-12"
                            >
                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-200 to-orange-400 blur-[2px] opacity-70 shadow-[0_0_15px_rgba(255,200,0,0.8)]" />
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            ))}
        </div>
    );
}
