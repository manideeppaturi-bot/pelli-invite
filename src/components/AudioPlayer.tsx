"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);
    const [audioSrc, setAudioSrc] = useState("");

    // Randomize BGM on client only to avoid SSR hydration mismatch
    useEffect(() => {
        const songs = ["/dude_bgm.mp3", "/jashn_e_bahara_bgm.mp3", "/varsham_bgm.mp3"];
        setAudioSrc(songs[Math.floor(Math.random() * songs.length)]);
    }, []);

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
                        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FDF9D2] cursor-pointer"
                        onClick={handleEnter}
                    >
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/floral-motif.png')] pointer-events-none" />

                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="text-center z-10 flex flex-col items-center"
                        >
                            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6 drop-shadow-2xl">
                                <Image
                                    src="/mani_suppu_icon_clean.png"
                                    alt="Mani & Suppu"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl text-[#CF2F2A] mb-2 drop-shadow-md">
                                Mani <span className="text-[#E79300]">❤️</span> Suppu
                            </h2>
                            <p className="font-sans text-[#696B36]/80 tracking-[0.2em] text-[10px] md:text-xs uppercase mb-6">
                                Wedding Celebration
                            </p>
                            <p className="font-sans text-[#CF2F2A] tracking-[0.4em] text-xs md:text-sm uppercase drop-shadow-md animate-pulse">
                                Tap anywhere to open
                            </p>
                        </motion.div>

                        <div className="absolute top-0 left-0 w-full h-6 bg-[repeating-linear-gradient(90deg,#E79300,#E79300_15px,#CF2F2A_15px,#CF2F2A_30px)] shadow-md" />
                        <div className="absolute bottom-0 left-0 w-full h-6 bg-[repeating-linear-gradient(90deg,#E79300,#E79300_15px,#CF2F2A_15px,#CF2F2A_30px)] shadow-md" />
                    </motion.div>
                )}
            </AnimatePresence>
            {audioSrc && <audio ref={audioRef} src={audioSrc} loop preload="auto" />}
        </>
    );
}
