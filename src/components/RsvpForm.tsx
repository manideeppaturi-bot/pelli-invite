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

        // Check if any event is selected
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
            <div className="w-full py-24 px-4 bg-primary-50">
                <div className="max-w-xl mx-auto bg-sand p-8 rounded-2xl shadow-lg border border-gold-500/20 text-center">
                    <h3 className="text-3xl font-serif text-primary-900 mb-4">Thank You!</h3>
                    <p className="font-sans text-foreground/80">Your RSVP has been confirmed. We can't wait to celebrate with you!</p>
                </div>
            </div>
        );
    }

    return (
        <section id="rsvp" className="w-full py-24 px-4 bg-primary-50">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif text-crimson mb-4">RSVP</h2>
                    <div className="w-24 h-[1px] bg-gold-500 mx-auto mb-6" />
                    <p className="font-sans text-foreground/80">Kindly let us know if you can make it by April 1st, 2026.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-sand p-6 md:p-10 rounded-2xl shadow-xl border border-gold-500/20"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-primary-900 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-transparent border border-primary-800/30 rounded-lg px-4 py-3 focus:outline-none focus:border-crimson"
                                    placeholder="e.g. Rahul Sharma"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-primary-900 mb-1">Phone / Email</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-transparent border border-primary-800/30 rounded-lg px-4 py-3 focus:outline-none focus:border-crimson"
                                        placeholder="Contact info"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-primary-900 mb-1">Total Guests</label>
                                    <select
                                        className="w-full bg-transparent border border-primary-800/30 rounded-lg px-4 py-3 focus:outline-none focus:border-crimson appearance-none"
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

                        <div className="pt-4 border-t border-primary-800/10">
                            <label className="block text-sm font-semibold text-primary-900 mb-4">Which events will you attend?</label>
                            <div className="space-y-3">
                                {[
                                    { id: 'haldi', label: 'Haldi Function', field: 'attendingHaldi' },
                                    { id: 'wedding', label: 'The Wedding', field: 'attendingWedding' },
                                    { id: 'reception', label: 'Wedding Reception', field: 'attendingReception' },
                                ].map((event) => (
                                    <label key={event.id} className="flex items-center space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={formData[event.field as keyof typeof formData] as boolean}
                                                onChange={(e) => setFormData({ ...formData, [event.field]: e.target.checked })}
                                                className="peer sr-only"
                                            />
                                            <div className="w-5 h-5 border-2 border-primary-800/40 rounded transition-colors peer-checked:bg-crimson peer-checked:border-crimson" />
                                            <div className="absolute opacity-0 peer-checked:opacity-100 text-white pointer-events-none">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className="text-foreground/80 group-hover:text-primary-900 transition-colors">{event.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {status === "error" && (
                            <p className="text-red-500 text-sm">Something went wrong. Please try again or contact us directly.</p>
                        )}

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full bg-crimson hover:bg-primary-900 text-white font-serif text-lg py-4 rounded-xl transition-all shadow-md disabled:opacity-70 mt-6"
                        >
                            {status === "loading" ? "Confirming..." : "Confirm RSVP"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
