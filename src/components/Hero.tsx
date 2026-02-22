"use client";

import { motion } from "framer-motion";
import { Countdown } from "./Countdown";

export function Hero() {
    return (
        <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-sand px-4">
            {/* Subtle decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                {/* Placeholder for floral or mandala bg pattern */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-crimson rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="z-10 flex flex-col items-center text-center space-y-6"
            >
                <span className="uppercase tracking-[0.2em] text-sm md:text-md text-gold-500 font-semibold">
                    We are getting married
                </span>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-crimson leading-tight py-4">
                    Manideep <br className="md:hidden" />
                    <span className="text-3xl md:text-5xl italic text-gold-500">&amp;</span> <br className="md:hidden" />
                    Supriya
                </h1>

                <p className="text-lg md:text-xl font-sans text-foreground/80 max-w-lg mt-4">
                    Join us as we celebrate our love and begin our new journey together.
                </p>

                <div className="mt-8 flex flex-col items-center gap-2">
                    <p className="font-serif text-xl text-primary-900 border-y border-gold-500/50 py-2 px-8 inline-block">
                        May 3rd, 2026
                    </p>
                </div>

                <div className="mt-12 w-full max-w-md">
                    <Countdown targetDate="2026-05-03T09:00:00" />
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 flex flex-col items-center"
            >
                <p className="text-sm uppercase tracking-widest text-primary-800/60 mb-2">Scroll</p>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary-800/60 to-transparent" />
            </motion.div>
        </section>
    );
}
