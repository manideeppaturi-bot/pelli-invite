"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export function RsvpForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        guests: "1",
        attendingHaldi: false,
        attendingWedding: false,
        attendingReception: false,
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        if (!formData.attendingHaldi && !formData.attendingWedding && !formData.attendingReception) {
            alert("Please select at least one event you are attending.");
            setStatus("idle");
            return;
        }

        try {
            const { error } = await supabase.from("rsvps").insert([
                {
                    name: formData.name,
                    email: formData.email,
                    guests_count: parseInt(formData.guests),
                    attending_haldi: formData.attendingHaldi,
                    attending_wedding: formData.attendingWedding,
                    attending_reception: formData.attendingReception,
                },
            ]);

            if (error) throw error;
            setStatus("success");
        } catch (error) {
            console.error("Error submitting RSVP:", error);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="w-full py-24 px-4 bg-[#FDF9D2]">
                <div className="max-w-xl mx-auto bg-meenaya-purple/10 p-12 rounded-t-[100px] shadow-lg border border-meenaya-gold/20 text-center relative overflow-hidden">
                    <div className="absolute inset-2 border-[1px] border-meenaya-gold/40 rounded-t-[90px] pointer-events-none" />
                    <h3 className="text-4xl font-serif text-meenaya-maroon mb-6 mt-8">Thank You!</h3>
                    <p className="font-sans text-meenaya-text/90 text-lg">Your RSVP has been beautifully received. We can&apos;t wait to celebrate with you!</p>
                </div>
            </div>
        );
    }

    return (
        <section id="rsvp" className="w-full py-32 px-4 bg-meenaya-teal text-meenaya-cream relative">
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/floral-motif.png')] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-serif text-meenaya-cream mb-6 tracking-wide">RSVP</h2>
                    <div className="w-24 h-[1px] bg-meenaya-gold mx-auto mb-6" />
                    <p className="font-sans text-meenaya-cream/80 text-lg tracking-wider">Kindly let us know if you can make it by April 1st, 2026.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#FDF9D2] p-8 md:p-14 rounded-t-[100px] shadow-2xl border border-meenaya-gold/30 relative overflow-hidden"
                >
                    <div className="absolute inset-2 border-[1px] border-meenaya-gold/40 rounded-t-[90px] pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-8 mt-6 relative z-10">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-sans font-bold tracking-widest text-[#696B36] mb-2 uppercase">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/50 border-b-2 border-[#696B36]/30 px-4 py-3 focus:outline-none focus:border-meenaya-maroon text-[#696B36] font-serif text-xl placeholder:text-[#696B36]/40 transition-colors"
                                    placeholder="e.g. Rahul Sharma"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-sans font-bold tracking-widest text-[#696B36] mb-2 uppercase">Contact</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/50 border-b-2 border-[#696B36]/30 px-4 py-3 focus:outline-none focus:border-meenaya-maroon text-[#696B36] font-serif text-xl placeholder:text-[#696B36]/40 transition-colors"
                                        placeholder="Phone or Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-sans font-bold tracking-widest text-[#696B36] mb-2 uppercase">Total Guests</label>
                                    <select
                                        className="w-full bg-white/50 border-b-2 border-[#696B36]/30 px-4 py-3 focus:outline-none focus:border-meenaya-maroon text-[#696B36] font-serif text-xl appearance-none cursor-pointer transition-colors"
                                        value={formData.guests}
                                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                    >
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num}>
                                                {num} {num === 1 ? 'Person' : 'People'}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 mt-8 border-t border-[#696B36]/10">
                            <label className="block text-sm font-sans font-bold tracking-widest text-[#696B36] mb-6 uppercase text-center">Which events will you attend?</label>
                            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12">
                                {[
                                    { id: 'cocktail', label: 'Cocktail Party', field: 'attendingReception' },
                                    { id: 'haldi', label: 'Haldi', field: 'attendingHaldi' },
                                    { id: 'wedding', label: 'Wedding', field: 'attendingWedding' },
                                ].map((event) => (
                                    <label key={event.id} className="flex items-center space-x-3 cursor-pointer group justify-center">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={formData[event.field as keyof typeof formData] as boolean}
                                                onChange={(e) => setFormData({ ...formData, [event.field]: e.target.checked })}
                                                className="peer sr-only"
                                            />
                                            <div className="w-6 h-6 border-2 border-[#696B36]/40 rounded-sm transition-all peer-checked:bg-meenaya-maroon peer-checked:border-meenaya-maroon" />
                                            <div className="absolute opacity-0 peer-checked:opacity-100 text-white pointer-events-none">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className="text-[#696B36] font-serif text-xl group-hover:text-meenaya-maroon transition-colors">{event.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {status === "error" && (
                            <p className="text-meenaya-maroon text-center font-sans text-sm mt-4">Something went wrong. Please try again or contact us directly.</p>
                        )}

                        <div className="pt-8 text-center">
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="bg-meenaya-maroon hover:bg-[#8C1010] text-[#FDF9D2] font-sans font-bold tracking-widest uppercase text-sm px-12 py-5 rounded-full transition-all shadow-xl disabled:opacity-70"
                            >
                                {status === "loading" ? "Confirming..." : "Confirm RSVP"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
