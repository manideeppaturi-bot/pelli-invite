"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
}

export function CursorTrail() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        let particleId = 0;
        const colors = ["#CF2F2A", "#E79300", "#FDF9D2", "#45A086"];

        const handleMouseMove = (e: MouseEvent) => {
            // Only generate particles occasionally to avoid lagging
            if (Math.random() > 0.4) return;
            createParticle(e.clientX, e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (Math.random() > 0.4) return;
            const touch = e.touches[0];
            createParticle(touch.clientX, touch.clientY);
        };

        const createParticle = (x: number, y: number) => {
            const newParticle: Particle = {
                id: particleId++,
                x,
                y,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 10 + 4, // 4px to 14px
            };

            setParticles((prev) => [...prev, newParticle]);

            // Remove particle after animation
            setTimeout(() => {
                setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
            }, 800);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
                        animate={{
                            opacity: 0,
                            scale: 0,
                            y: p.y + (Math.random() * 50 + 20),
                            x: p.x + (Math.random() * 40 - 20),
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute rounded-full shadow-[0_0_10px_currentColor]"
                        style={{
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            color: p.color,
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
