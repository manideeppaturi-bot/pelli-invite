"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export function OutroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "-20% 0px", once: false });

    // Handle auto-playing when scrolled into view
    useEffect(() => {
        if (!videoRef.current) return;

        if (isInView) {
            videoRef.current.play().catch(console.error);
            // Dispatch event to pause background music if needed
            window.dispatchEvent(new CustomEvent("video-playing"));
        } else {
            videoRef.current.pause();
            // Dispatch event to resume background music if needed
            window.dispatchEvent(new CustomEvent("video-paused"));
        }
    }, [isInView]);

    return (
        <section ref={containerRef} className="w-full bg-[#3B8A73] py-20 px-4 relative flex flex-col items-center justify-center">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/floral-motif.png')] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-[40px] shadow-2xl relative z-10 border-4 border-[#FDF9D2]/30 flex items-center justify-center bg-black"
            >
                <video
                    ref={videoRef}
                    src="/bride-groom.mp4"
                    className="w-full h-full object-contain"
                    controls
                    playsInline
                    loop
                />
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-12 text-[#FDF9D2] font-serif text-3xl md:text-5xl text-center tracking-wide"
            >
                See you there!
            </motion.h2>
        </section>
    );
}
