"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function Story() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"], // Begins when top of element hits bottom of viewport
    });

    // Slower, subtle parallax movements for premium feel without spring jitter under Lenis
    const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
    // Deep Parallax specifically for the Story image
    const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <section ref={containerRef} className="w-full py-32 px-4 bg-[#FDF9D2] text-[#696B36] relative overflow-hidden">

            {/* Saree Border Top */}
            <div className="absolute top-0 left-0 w-full h-6 bg-[repeating-linear-gradient(90deg,#E79300,#E79300_10px,#CF2F2A_10px,#CF2F2A_20px)] shadow-md z-20 opacity-90" />
            <div className="absolute top-6 left-0 w-full h-2 bg-gradient-to-r from-[#CF2F2A] via-[#E79300] to-[#CF2F2A] z-20" />

            {/* Subtle Background Art / Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/floral-motif.png')] pointer-events-none z-0" />

            {/* Decorative Corner Mandalas */}
            <div className="absolute top-16 left-4 w-32 h-32 md:w-64 md:h-64 border-[1px] border-[#E79300]/30 rounded-full opacity-50 pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-16 right-4 w-32 h-32 md:w-64 md:h-64 border-[1px] border-[#E79300]/30 rounded-full opacity-50 pointer-events-none translate-x-1/2 -translate-y-1/2" />


            <div className="max-w-5xl mx-auto relative z-10 pt-12">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif text-[#CF2F2A] tracking-wider mb-8 drop-shadow-sm"
                    >
                        Our Story
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="w-32 h-[2px] bg-[#E79300] mx-auto origin-center"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center text-left">

                    <motion.div
                        style={{ y: textY }}
                        className="space-y-8 order-2 md:order-1 relative z-20"
                    >
                        {/* Cute Lotus Infographic */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E79300" strokeWidth="1" className="mb-4 opacity-80" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2c0 0-4 10-10 12 6-2 10-12 10-12z" />
                            <path d="M12 2c0 0 4 10 10 12-6-2-10-12-10-12z" />
                            <path d="M12 22c0 0-4-10-10-12 6 2 10 12 10 12z" />
                            <path d="M12 22c0 0 4-10 10-12-6 2-10 12-10 12z" />
                            <circle cx="12" cy="12" r="3" fill="#CF2F2A" />
                        </svg>

                        <h3 className="text-4xl md:text-5xl font-serif text-[#CF2F2A] leading-tight">
                            Two paths <br /> <span className="italic text-[#E79300] font-serif pr-4">beautifully</span> aligned.
                        </h3>
                        <div className="w-16 h-[1px] bg-[#E79300] my-4" />
                        <p className="font-sans text-[#696B36]/90 leading-relaxed text-lg tracking-wide">
                            We started as two strangers with a shared heritage and different dreams. We met in Philly, and a casual meeting turned into endless conversations. Soon enough, we realized that we had found something incredibly special.
                        </p>
                        <p className="font-sans text-[#696B36]/90 leading-relaxed text-lg tracking-wide">
                            Surrounded by our wonderful families and friends, we are taking the next step in our journey together. We cannot wait to celebrate our love and heritage with all of you.
                        </p>
                    </motion.div>

                    <div className="relative order-1 md:order-2 flex justify-center">
                        {/* The Cathedral Arch Image Container with Parallax inner image */}
                        <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-t-full border-[8px] border-[#45A086] overflow-hidden shadow-2xl bg-[#E6D3FF]/20 group z-10">
                            <motion.div
                                style={{ y: imageY }}
                                className="absolute inset-0 w-full h-[140%] -top-[20%]"
                            >
                                {/* Inner image container that moves with scroll */}
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/couple-photo.png"
                                        alt="Manideep and Supriya"
                                        fill
                                        className="object-cover grayscale-[20%] sepia-[10%] drop-shadow-md"
                                        priority
                                    />
                                </div>
                            </motion.div>

                            {/* Overlay gradient for premium feel */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#FDF9D2]/40 to-transparent pointer-events-none" />
                        </div>

                        {/* Decorative Elements around the Arch */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-12 -right-12 w-32 h-32 border-dashed border-2 border-[#E79300]/50 rounded-full z-0 pointer-events-none"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -bottom-8 -left-8 w-24 h-24 border-dotted border-[3px] border-[#CF2F2A]/40 rounded-full z-0 pointer-events-none"
                        />
                    </div>
                </div>
            </div>

            {/* Saree Border Bottom */}
            <div className="absolute bottom-6 left-0 w-full h-2 bg-gradient-to-r from-[#CF2F2A] via-[#E79300] to-[#CF2F2A] z-20" />
            <div className="absolute bottom-0 left-0 w-full h-6 bg-[repeating-linear-gradient(90deg,#E79300,#E79300_10px,#45A086_10px,#45A086_20px)] shadow-md z-20 opacity-90" />
        </section>
    );
}
