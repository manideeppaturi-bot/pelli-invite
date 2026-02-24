"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FloatingParticles } from "./FloatingParticles";

export function Story() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const [isMobile, setIsMobile] = useState(true);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Disable parallax on mobile to prevent jerkiness
    const textY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["10%", "-10%"]);

    // Background layer moves slower
    const bgY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-10%", "10%"]);
    // Foreground layer moves faster to create popping 3D depth
    const fgY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["10%", "-15%"]);

    return (
        <section ref={containerRef} className="w-full py-32 px-4 bg-[#FDF9D2] text-[#696B36] relative overflow-hidden">

            {/* Saree Border Top */}
            <div className="absolute top-0 left-0 w-full h-6 bg-[repeating-linear-gradient(90deg,#E79300,#E79300_10px,#CF2F2A_10px,#CF2F2A_20px)] shadow-md z-20 opacity-90" />
            <div className="absolute top-6 left-0 w-full h-2 bg-gradient-to-r from-[#CF2F2A] via-[#E79300] to-[#CF2F2A] z-20" />

            {/* Peeking Couple (Left edge - Slide in and stay) */}
            <motion.div
                initial={{ x: "-60%", opacity: 0 }}
                whileInView={{ x: "0%", opacity: 1 }}
                viewport={{ once: true, margin: "200px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute top-1/4 left-0 z-30 pointer-events-none w-[120px] sm:w-[160px] md:w-[250px] lg:w-[300px] h-[30%] sm:h-[35%] md:h-[50%]"
            >
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="/couple_modern_icon.png"
                        alt="Mani & Supriya"
                        fill
                        className="object-contain object-left-bottom"
                        priority
                    />
                </motion.div>
            </motion.div>

            <FloatingParticles count={6} />

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
                        viewport={{ once: true, margin: "200px" }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif text-[#CF2F2A] tracking-wider mb-8 drop-shadow-sm"
                    >
                        Our Story
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "200px" }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="w-32 h-[2px] bg-[#E79300] mx-auto origin-center"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center text-left">

                    <motion.div
                        style={{ y: textY }}
                        className="space-y-8 order-2 md:order-1 relative z-20 px-8 pl-16 sm:pl-20 md:pl-8 pr-16 md:px-0"
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
                        <div
                            className="relative w-full max-w-[400px] aspect-[3/4] rounded-t-full border-[8px] border-[#45A086] overflow-hidden shadow-2xl bg-[#E6D3FF]/20 group z-10"
                            style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                        >
                            {/* Layer 1: Background Street (Slower Scroll) */}
                            <motion.div
                                style={{ y: bgY }}
                                className={`absolute inset-0 w-full ${isMobile ? 'h-full top-0' : 'h-[120%] -top-[10%]'}`}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/couple-photo.png"
                                        alt="European Street Background"
                                        fill
                                        className="object-cover drop-shadow-md"
                                        priority
                                    />
                                </div>
                            </motion.div>

                            {/* Layer 2: Foreground Couple (Faster Scroll for 3D Pop Out) */}
                            <motion.div
                                style={{ y: fgY }}
                                className={`absolute inset-0 w-full ${isMobile ? 'h-full top-0' : 'h-[130%] -top-[15%]'}`}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/couple-photo-fg.png"
                                        alt="Manideep and Supriya"
                                        fill
                                        className="object-cover drop-shadow-2xl"
                                        priority
                                    />
                                </div>
                            </motion.div>
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
