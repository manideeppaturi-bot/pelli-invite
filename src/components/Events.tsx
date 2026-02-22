"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";

const events = [
    {
        title: "Haldi Function",
        date: "Saturday, May 2nd, 2026",
        time: "10:00 AM onwards",
        venue: "The Marriott Allentown",
        address: "123 Main St, Allentown, PA",
        mapLink: "https://maps.google.com/?q=Allentown+PA",
        description: "Join us for a morning of colors, joy, and blessings as we kick off the celebrations with traditional Haldi.",
    },
    {
        title: "The Wedding (Muhurtham)",
        date: "Sunday, May 3rd, 2026",
        time: "9:00 AM - 1:00 PM",
        venue: "Grand Banquet Hall",
        address: "456 Wedding Rd, Boyertown, PA",
        mapLink: "https://maps.google.com/?q=Boyertown+PA",
        description: "Witness the sacred union as Manideep and Supriya tie the knot in a traditional South-Indian ceremony.",
    },
    {
        title: "Wedding Reception",
        date: "Sunday, May 3rd, 2026",
        time: "7:00 PM onwards",
        venue: "Grand Banquet Hall",
        address: "456 Wedding Rd, Boyertown, PA",
        mapLink: "https://maps.google.com/?q=Boyertown+PA",
        description: "An evening of dance, dinner, and celebration to officially welcome the newlyweds.",
    }
];

export function Events() {
    return (
        <section className="w-full py-24 px-4 bg-primary-50 relative">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-crimson mb-4">Event Details</h2>
                    <div className="w-24 h-[1px] bg-gold-500 mx-auto" />
                </div>

                <div className="space-y-12">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-sand rounded-xl p-6 md:p-8 shadow-sm border border-gold-500/10 flex flex-col md:flex-row gap-6 items-center md:items-start"
                        >
                            <div className="md:w-1/3 text-center md:text-left flex flex-col items-center md:items-start space-y-3">
                                <h3 className="text-2xl font-serif text-primary-900">{event.title}</h3>
                                <div className="w-12 h-[2px] bg-gold-400" />
                            </div>

                            <div className="md:w-2/3 space-y-4">
                                <p className="text-foreground/80 font-sans italic">{event.description}</p>

                                <div className="space-y-2 mt-4 text-sm font-sans text-primary-800">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gold-500" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gold-500" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gold-500" />
                                        <div>
                                            <span className="block font-semibold">{event.venue}</span>
                                            <span className="block text-xs opacity-70">{event.address}</span>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href={event.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 text-sm font-semibold text-crimson border border-crimson/30 rounded-full px-4 py-2 hover:bg-crimson hover:text-white transition-colors"
                                >
                                    View on Map
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
