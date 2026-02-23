"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Countdown } from "./Countdown";

import { FloatingParticles } from "./FloatingParticles";

export function Hero() {

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
                {/* Raised mobile arch height to close the visual gap */}
                <div className="relative w-[250vw] sm:w-[150vw] md:w-[120vw] max-w-[1800px] h-[80vh] sm:h-[65vh] md:h-[70vh] mix-blend-multiply">
                    <Image
                        src="/gopuram.png"
                        alt="Temple Gopuram"
                        fill
                        className="object-cover object-bottom md:object-contain"
                        priority
                    />
                </div>
            </motion.div>

            {/* Floating Elements (Mid-Background) */}
            <FloatingParticles count={15} />


            {/* Peeking Gods (Right edge - Enlarged and Animated) */}
            <motion.div
                initial={{ x: 150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="absolute bottom-0 right-0 z-40 pointer-events-none mix-blend-multiply w-[240px] sm:w-[200px] md:w-[350px] lg:w-[400px] h-[45%] sm:h-[50%] md:h-[60%] translate-x-[40%] md:translate-x-0"
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
                        className="object-contain object-center md:object-right-bottom"
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
