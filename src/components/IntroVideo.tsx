"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export function IntroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
        // Broadcast custom event to tell the global AudioPlayer to pause
        window.dispatchEvent(new CustomEvent("video-playing"));
    };

    const handlePause = () => {
        // Broadcast custom event to tell the global AudioPlayer to resume
        window.dispatchEvent(new CustomEvent("video-paused"));
    };

    return (
        <section className="w-full py-24 px-4 bg-[#FDF9D2] relative overflow-hidden flex flex-col items-center">

            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/floral-motif.png')] pointer-events-none z-0" />

            <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 flex flex-col items-center"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-[#CF2F2A] tracking-wider mb-4 drop-shadow-sm">
                        A Journey Together
                    </h2>
                    <div className="w-24 h-[1px] bg-[#E79300]" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative w-full aspect-[9/16] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-[#45A086]/20 bg-black/5"
                >
                    {/* The video from the user */}
                    <video
                        ref={videoRef}
                        controls
                        playsInline
                        className="w-full h-full object-cover"
                        onPlay={handlePlay}
                        onPause={handlePause}
                        onEnded={handlePause}
                        src="/intro-video.mp4"
                    />
                </motion.div>
            </div>

            {/* Saree Border Top Separator */}
            <div className="absolute bottom-0 left-0 w-full h-6 bg-[repeating-linear-gradient(90deg,#E79300,#E79300_10px,#CF2F2A_10px,#CF2F2A_20px)] shadow-md z-20 opacity-90" />
            <div className="absolute bottom-6 left-0 w-full h-2 bg-gradient-to-r from-[#CF2F2A] via-[#E79300] to-[#CF2F2A] z-20" />
        </section>
    );
}
