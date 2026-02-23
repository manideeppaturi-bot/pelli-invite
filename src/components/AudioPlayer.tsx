"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Listen for custom events dispatched by the IntroVideo component
        const handleVideoPlay = () => audio.pause();
        const handleVideoPause = () => {
            if (isPlaying) audio.play().catch(() => { });
        };

        window.addEventListener("video-playing", handleVideoPlay);
        window.addEventListener("video-paused", handleVideoPause);

        return () => {
            window.removeEventListener("video-playing", handleVideoPlay);
            window.removeEventListener("video-paused", handleVideoPause);
        };
    }, [isPlaying]);

    const handleEnter = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.play().then(() => setIsPlaying(true)).catch(console.error);
        }
        setHasEntered(true);
        document.body.style.overflow = "auto";
    };

    useEffect(() => {
        if (!hasEntered) {
            document.body.style.overflow = "hidden";
            // Scroll to top to ensure they see the envelope
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = "auto";
        }
    }, [hasEntered]);

    return (
        <>
            <AnimatePresence>
                {!hasEntered && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#CF2F2A] cursor-pointer"
                        onClick={handleEnter}
                    >
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/floral-motif.png')] pointer-events-none" />

                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="text-center z-10 flex flex-col items-center"
                        >
                            <div className="w-20 h-20 rounded-full border-2 border-[#E79300] flex items-center justify-center mb-8 bg-[#FDF9D2]/10 backdrop-blur-sm shadow-[0_0_30px_rgba(231,147,0,0.3)]">
                                <svg className="w-8 h-8 text-[#E79300] ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif text-[#FDF9D2] tracking-widest uppercase mb-6 drop-shadow-lg">
                                You're Invited
                            </h1>
                            <p className="font-sans text-[#E79300] tracking-[0.4em] text-xs md:text-sm uppercase drop-shadow-md">
                                Tap anywhere to open
                            </p>
                        </motion.div>

                        <div className="absolute top-0 left-0 w-full h-6 bg-[repeating-linear-gradient(90deg,#E79300,#E79300_15px,#CF2F2A_15px,#CF2F2A_30px)] shadow-md" />
                        <div className="absolute bottom-0 left-0 w-full h-6 bg-[repeating-linear-gradient(90deg,#E79300,#E79300_15px,#CF2F2A_15px,#CF2F2A_30px)] shadow-md" />
                    </motion.div>
                )}
            </AnimatePresence>
            <audio ref={audioRef} src="/bgm.mp3" loop />
        </>
    );
}
