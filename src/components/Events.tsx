"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
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
        dressCode: "Indo-Western or Cocktail Attire",
        venueDetails: "The specific location is currently being finalized. Please check back later for full venue details.",
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
        dressCode: "Yellow or bright traditional Indian attire",
        venueDetails: "Covered Bridge Retreat features a beautiful outdoor space. Parking will be available on-site.",
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
        dressCode: "Traditional South Indian or Formal Indian Attire",
        venueDetails: "Grand Banquet Hall has ample parking. Seating will be provided for all guests during the Muhurtham.",
        icon: (
            <div className="relative w-32 h-32 md:w-40 md:h-40 mix-blend-multiply mb-4">
                <Image src="/wedding.png" alt="Wedding" fill className="object-contain" />
            </div>
        )
    }
];

export interface EventItem {
    title: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    mapLink: string;
    description: string;
    dressCode: string;
    venueDetails: string;
    icon: React.ReactNode;
}

function EventCard({ event, index }: { event: EventItem, index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<"dress" | "venue" | null>(null);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const toggleMain = () => {
        setIsExpanded(!isExpanded);
        if (isExpanded) setOpenDropdown(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: isMobile ? 40 : 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: isMobile ? 0.5 : 0.8, delay: index * 0.15, ease: "easeOut" }}
            {...(!isMobile && { whileHover: { y: -10, transition: { duration: 0.3 } } })}
            className="bg-[#FDF9D2] rounded-t-[120px] md:rounded-t-[180px] p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-[#E79300]/30 flex flex-col items-center text-center relative overflow-hidden group w-full will-change-transform"
            style={{ transform: 'translateZ(0)' }}
        >
            {/* Cathedral Arch Inner Border Layering */}
            <div className="absolute inset-3 border-[2px] border-[#E79300]/50 rounded-t-[110px] md:rounded-t-[170px] pointer-events-none" />
            <div className="absolute inset-5 border-[1px] border-dashed border-[#CF2F2A]/30 rounded-t-[100px] md:rounded-t-[160px] pointer-events-none" />

            <div className="mt-12 flex flex-col items-center space-y-6 relative z-10 w-full">
                {/* Event Specific Infographic Icon */}
                {event.icon}

                <h3 className="text-3xl lg:text-4xl font-serif text-[#CF2F2A] uppercase tracking-[0.2em]">{event.title}</h3>
                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#E79300] to-transparent" />
            </div>

            <div className="mt-10 space-y-6 flex-grow relative z-10 w-full">
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

                <p className="text-[#696B36]/90 font-sans italic text-base leading-relaxed mt-8 mb-6 px-4">
                    &quot;{event.description}&quot;
                </p>

                {/* More Details Dropdown */}
                <div className="w-full mt-4 flex flex-col items-center">
                    <button
                        onClick={toggleMain}
                        className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-[#E79300] border-b-2 border-[#E79300]/50 hover:border-[#CF2F2A] pb-1 hover:text-[#CF2F2A] transition-colors flex items-center justify-center gap-2"
                    >
                        {isExpanded ? "Less Details" : "More Details"}
                        <motion.svg
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </motion.svg>
                    </button>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="w-full overflow-hidden mt-6"
                            >
                                <div className="space-y-4 text-left w-full px-2">
                                    {/* Dress Code Sub-Dropdown */}
                                    <div className="w-full bg-[#E79300]/10 rounded-lg overflow-hidden border border-[#E79300]/30 transition-all">
                                        <button
                                            onClick={() => setOpenDropdown(openDropdown === "dress" ? null : "dress")}
                                            className="w-full px-4 py-3 flex justify-between items-center text-[#CF2F2A] font-sans font-bold text-sm tracking-wider uppercase hover:bg-[#E79300]/20 transition-colors"
                                        >
                                            <span>Dress Code</span>
                                            <motion.svg
                                                animate={{ rotate: openDropdown === "dress" ? 180 : 0 }}
                                                className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </motion.svg>
                                        </button>
                                        <AnimatePresence>
                                            {openDropdown === "dress" && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="px-4 pb-4 pt-1 font-sans text-sm text-[#696B36] leading-relaxed">
                                                        {event.dressCode}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Venue Sub-Dropdown */}
                                    <div className="w-full bg-[#E79300]/10 rounded-lg overflow-hidden border border-[#E79300]/30 transition-all">
                                        <button
                                            onClick={() => setOpenDropdown(openDropdown === "venue" ? null : "venue")}
                                            className="w-full px-4 py-3 flex justify-between items-center text-[#CF2F2A] font-sans font-bold text-sm tracking-wider uppercase hover:bg-[#E79300]/20 transition-colors"
                                        >
                                            <span>Reaching Venue</span>
                                            <motion.svg
                                                animate={{ rotate: openDropdown === "venue" ? 180 : 0 }}
                                                className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </motion.svg>
                                        </button>
                                        <AnimatePresence>
                                            {openDropdown === "venue" && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-4 pb-4 pt-1 flex flex-col gap-3">
                                                        <p className="font-sans text-sm text-[#696B36] leading-relaxed">
                                                            {event.venueDetails}
                                                        </p>
                                                        {event.mapLink && (
                                                            <a
                                                                href={event.mapLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-block mt-1 font-sans font-bold text-xs tracking-wider uppercase text-[#45A086] hover:text-[#CF2F2A] transition-colors self-start"
                                                            >
                                                                Open in Google Maps &rarr;
                                                            </a>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {!isExpanded && (
                <a
                    href={event.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 mb-2 relative z-10 inline-block font-sans font-bold text-[10px] tracking-[0.2em] uppercase text-[#696B36]/60 hover:text-[#CF2F2A] transition-colors"
                >
                    Quick Map Link
                </a>
            )}
        </motion.div>
    );
}

export function Events() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Disable parallax on mobile to prevent jerkiness
    const gridY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["10%", "-5%"]);
    const bgY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "50%"]);

    return (
        <section ref={containerRef} className="w-full py-40 px-4 bg-[#E6D3FF] relative overflow-hidden">

            {/* Peeking Groom's Family (Top-Left - Drop Animation) */}
            <motion.div
                initial={{ y: -120, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                className="absolute top-0 left-0 z-30 pointer-events-none w-[160px] sm:w-[240px] md:w-[340px] h-[18%] sm:h-[22%] md:h-[28%] -translate-x-[15%] md:-translate-x-[5%]"
            >
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="/groom_family_clean.png"
                        alt="Groom Family"
                        fill
                        className="object-contain object-left-top"
                        priority
                    />
                </motion.div>
            </motion.div>

            {/* Peeking Bride's Family (Top-Right - Drop Animation) */}
            <motion.div
                initial={{ y: -120, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="absolute top-0 right-0 z-30 pointer-events-none w-[160px] sm:w-[240px] md:w-[340px] h-[18%] sm:h-[22%] md:h-[28%] translate-x-[15%] md:translate-x-[5%]"
            >
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="/bride_family_clean.png"
                        alt="Bride Family"
                        fill
                        className="object-contain object-right-top"
                        priority
                    />
                </motion.div>
            </motion.div>

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

            <div className="max-w-7xl mx-auto relative z-10 pt-44 sm:pt-52 md:pt-56">
                <div className="text-center mb-16 md:mb-24 relative z-40 bg-white/40 backdrop-blur-sm rounded-3xl py-4 mx-4 md:bg-transparent md:backdrop-blur-none md:py-0 md:mx-0 shadow-sm md:shadow-none border border-white/50 md:border-none inline-block px-12 md:px-0 md:block">
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
                        <EventCard key={index} event={event} index={index} />
                    ))}
                </motion.div>
            </div>

            {/* Saree Border styling separator for next section */}
            <div className="absolute bottom-0 left-0 w-full h-8 bg-[repeating-linear-gradient(45deg,#45A086,#45A086_15px,#E6D3FF_15px,#E6D3FF_30px)] opacity-50 z-20" />
        </section>
    );
}
