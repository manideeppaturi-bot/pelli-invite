"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { FloatingParticles } from "./FloatingParticles";

const events = [
    {
        title: "COCKTAIL PARTY",
        date: "FRIDAY, MAY 1ST 2026",
        time: "8:00 PM ONWARDS",
        venue: "TBD",
        address: "Location to be announced",
        mapLink: "",
        description: "Join us for a mesmerizing evening of drinks, dancing, and celebration to kick off the wedding weekend.",
        icon: (
            <div className="relative w-32 h-32 md:w-40 md:h-40 mix-blend-multiply mb-4">
                <Image src="/cocktail.png" alt="Cocktail Party" fill className="object-contain" />
            </div>
        )
    },
    {
        title: "HALDI",
        date: "SATURDAY, MAY 2ND 2026",
        time: "10:00 AM ONWARDS",
        venue: "COVERED BRIDGE RETREAT",
        address: "45 Covered Bridge Rd, Palmerton, PA 18071",
        mapLink: "https://maps.google.com/?q=45+Covered+Bridge+Road,+Palmerton,+PA",
        description: "Join us for a morning of colors, joy, and blessings as we celebrate with the traditional Haldi.",
        icon: (
            <div className="relative w-32 h-32 md:w-40 md:h-40 mix-blend-multiply mb-4">
                <Image src="/haldi.png" alt="Haldi" fill className="object-contain" />
            </div>
        )
    },
    {
        title: "WEDDING",
        date: "SUNDAY, MAY 3RD 2026",
        time: "9:00 AM – 1:00 PM",
        venue: "GRAND BANQUET HALL",
        address: "456 Wedding Rd, Boyertown, PA",
        mapLink: "https://maps.google.com/?q=Boyertown+PA",
        description: "Witness the sacred union as Manideep and Supriya tie the knot in a traditional South-Indian ceremony.",
        icon: (
            <div className="relative w-32 h-32 md:w-40 md:h-40 mix-blend-multiply mb-4">
                <Image src="/wedding.png" alt="Wedding" fill className="object-contain" />
            </div>
        )
    }
];

export function Events() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax the entire grid container slightly upwards
    const gridY = useTransform(scrollYProgress, [0, 1], ["10%", "-5%"]);
    // Background texture moves at a different speed
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <section ref={containerRef} className="w-full py-32 px-4 bg-[#E6D3FF] relative overflow-hidden">

            <FloatingParticles count={6} />

            {/* 1. Deep Parallax Background Motif */}
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 w-full h-[150%] -top-[25%] opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/floral-motif.png')] pointer-events-none z-0"
            />

            {/* Giant decorative abstract mandala in bg */}
            <motion.div
                style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 90]) }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[2px] border-[#CF2F2A]/10 rounded-full pointer-events-none z-0 flex items-center justify-center"
            >
                <div className="w-[500px] h-[500px] border-[1px] border-dashed border-[#CF2F2A]/20 rounded-full" />
            </motion.div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-serif text-[#CF2F2A] tracking-wider mb-6 drop-shadow-sm"
                    >
                        Events
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-[2px] bg-[#E79300] mx-auto"
                    />
                </div>

                <motion.div
                    style={{ y: gridY }}
                    className="grid md:grid-cols-3 gap-10 lg:gap-14"
                >
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="bg-[#FDF9D2] rounded-t-[120px] md:rounded-t-[180px] p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-[#E79300]/30 flex flex-col items-center text-center relative overflow-hidden group cursor-default"
                        >
                            {/* Cathedral Arch Inner Border Layering */}
                            <div className="absolute inset-3 border-[2px] border-[#E79300]/50 rounded-t-[110px] md:rounded-t-[170px] pointer-events-none" />
                            <div className="absolute inset-5 border-[1px] border-dashed border-[#CF2F2A]/30 rounded-t-[100px] md:rounded-t-[160px] pointer-events-none" />

                            <div className="mt-12 flex flex-col items-center space-y-6 relative z-10">
                                {/* Event Specific Infographic Icon */}
                                {event.icon}

                                <h3 className="text-3xl lg:text-4xl font-serif text-[#CF2F2A] uppercase tracking-[0.2em]">{event.title}</h3>
                                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#E79300] to-transparent" />
                            </div>

                            <div className="mt-10 space-y-6 flex-grow relative z-10">
                                <div className="space-y-1">
                                    <p className="font-sans font-bold text-[#696B36] text-[13px] md:text-sm tracking-[0.2em] uppercase">
                                        {event.date}
                                    </p>
                                    <p className="font-sans text-[#696B36]/80 text-sm tracking-wide">
                                        {event.time}
                                    </p>
                                </div>

                                <div className="space-y-1 pt-4">
                                    <p className="font-sans font-bold text-[#696B36] text-[13px] md:text-sm tracking-[0.2em] uppercase leading-relaxed">
                                        {event.venue}
                                    </p>
                                </div>

                                <p className="text-[#696B36]/90 font-sans italic text-base leading-relaxed mt-8 mb-10 px-4">
                                    &quot;{event.description}&quot;
                                </p>
                            </div>

                            <a
                                href={event.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto relative z-10 inline-block font-sans font-bold text-xs tracking-[0.3em] uppercase text-[#E79300] border-b-2 border-[#E79300]/50 hover:border-[#CF2F2A] pb-2 hover:text-[#CF2F2A] transition-colors"
                            >
                                See Directions
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Saree Border styling separator for next section */}
            <div className="absolute bottom-0 left-0 w-full h-8 bg-[repeating-linear-gradient(45deg,#45A086,#45A086_15px,#E6D3FF_15px,#E6D3FF_30px)] opacity-50 z-20" />
        </section>
    );
}
