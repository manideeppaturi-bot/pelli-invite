"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { FloatingParticles } from "./FloatingParticles";

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

    const [totalGuests, setTotalGuests] = useState(15);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [welcomeName, setWelcomeName] = useState("");

    // Load total guests and local session on mount
    useEffect(() => {
        const fetchGuests = async () => {
            const { data, error } = await supabase.from("rsvps").select("guests_count");
            if (data && !error) {
                const count = data.reduce((sum, row) => sum + (row.guests_count || 0), 0);
                setTotalGuests(15 + count);
            }
        };
        fetchGuests();

        const sessionRaw = localStorage.getItem("rsvpSession");
        if (sessionRaw) {
            try {
                const session = JSON.parse(sessionRaw);
                setFormData({
                    name: session.name || "",
                    email: session.email || "",
                    guests: session.guests || "1",
                    attendingHaldi: session.attendingHaldi || false,
                    attendingWedding: session.attendingWedding || false,
                    attendingReception: session.attendingReception || false,
                });
                if (session.id) setSessionId(session.id);
                if (session.name) setWelcomeName(session.name.split(" ")[0]);
            } catch {
                console.error("Failed to parse session");
            }
        }
    }, []);

    const playDing = () => {
        try {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            const audioCtx = new AudioContextClass();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.5);
        } catch { }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        if (!formData.attendingHaldi && !formData.attendingWedding && !formData.attendingReception) {
            alert("Please select at least one event you are attending.");
            setStatus("idle");
            return;
        }

        try {
            let newId = sessionId;
            let guestsDelta = 0;

            if (sessionId) {
                // Determine difference if editing, for visual counter bump
                const sessionRaw = localStorage.getItem("rsvpSession");
                const oldGuests = sessionRaw ? JSON.parse(sessionRaw).guests : 0;
                guestsDelta = parseInt(formData.guests) - parseInt(oldGuests || "0");

                const { error } = await supabase.from("rsvps").update({
                    name: formData.name,
                    email: formData.email,
                    guests_count: parseInt(formData.guests),
                    attending_haldi: formData.attendingHaldi,
                    attending_wedding: formData.attendingWedding,
                    attending_reception: formData.attendingReception,
                }).eq("id", sessionId);

                if (error) throw error;
            } else {
                guestsDelta = parseInt(formData.guests);
                const { data, error } = await supabase.from("rsvps").insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        guests_count: parseInt(formData.guests),
                        attending_haldi: formData.attendingHaldi,
                        attending_wedding: formData.attendingWedding,
                        attending_reception: formData.attendingReception,
                    },
                ]).select();

                if (error) throw error;
                if (data && data[0]) {
                    newId = data[0].id;
                    setSessionId(data[0].id);
                }
            }

            // Save session
            localStorage.setItem("rsvpSession", JSON.stringify({ ...formData, id: newId }));
            setWelcomeName(formData.name.split(" ")[0]);

            if (guestsDelta > 0) {
                playDing();
                setTotalGuests((prev) => prev + guestsDelta);
            } else if (guestsDelta < 0) {
                setTotalGuests((prev) => prev + guestsDelta);
            }

            setStatus("success");
            // Auto hide success block to show edit state after a bit
            setTimeout(() => setStatus("idle"), 3000);
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
                    <motion.h3
                        initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
                        className="text-4xl font-serif text-[#CF2F2A] mb-6 mt-8"
                    >
                        Thank You!
                    </motion.h3>
                    <p className="font-sans text-[#696B36]/90 text-lg">Your RSVP has been beautifully received. We can&apos;t wait to celebrate with you!</p>
                </div>
            </div>
        );
    }

    return (
        <section id="rsvp" className="w-full py-32 px-4 bg-[#CF2F2A] text-[#FDF9D2] relative overflow-hidden">
            <FloatingParticles count={4} />
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/floral-motif.png')] pointer-events-none" />

            {/* Saree Border Top Separator */}
            <div className="absolute top-0 left-0 w-full h-4 bg-[repeating-linear-gradient(90deg,#E79300,#E79300_15px,#FDF9D2_15px,#FDF9D2_30px)] shadow-md z-20 opacity-90" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-serif text-[#FDF9D2] mb-6 tracking-wide drop-shadow-sm">
                        {welcomeName ? `Welcome back ${welcomeName}!` : "RSVP"}
                    </h2>
                    <div className="w-24 h-[1px] bg-[#E79300] mx-auto mb-6" />
                    <p className="text-center text-[#FDF9D2]/90 pb-6 text-sm font-sans mx-auto max-w-lg leading-relaxed">
                        We want you and your friends/family all to be here! Your guest count and RSVP helps us plan better. We understand things change, so checking back later lets you easily update your response.
                    </p>

                    {/* Guest Counter Odometer */}
                    <div className="flex flex-col items-center mt-4 space-y-2">
                        <p className="font-sans text-[#FDF9D2]/70 uppercase tracking-widest text-xs">Current Guest Count</p>
                        <div className="overflow-hidden flex items-center justify-center text-5xl font-serif text-[#E79300] tracking-widest bg-[#FDF9D2]/10 px-8 py-3 rounded-full border border-[#E79300]/30 shadow-[0_0_15px_rgba(231,147,0,0.2)]">
                            <AnimatePresence mode="popLayout">
                                <motion.span
                                    key={totalGuests}
                                    initial={{ y: -30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 30, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="inline-block"
                                >
                                    {totalGuests}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#FDF9D2] p-8 md:p-14 rounded-t-[100px] shadow-2xl border-4 border-[#E79300] relative overflow-hidden"
                >
                    {/* Telugu Mango Leaves (Toranam) Decor at Top of Card */}
                    <div className="w-full flex justify-between absolute top-0 left-0 right-0 px-8 py-2 opacity-90 z-20 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <svg key={i} width="30" height="50" viewBox="0 0 40 60" fill="none" className="drop-shadow-sm">
                                <path d="M20 0C20 0 40 15 40 30C40 45 20 60 20 60C20 60 0 45 0 30C0 15 20 0 20 0Z" fill="#45A086" />
                            </svg>
                        ))}
                    </div>

                    <div className="absolute inset-2 border-[1px] border-[#E79300]/40 rounded-t-[90px] pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-8 mt-6 relative z-10">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-sans font-bold tracking-widest text-[#696B36] mb-2 uppercase">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/50 border-b-2 border-[#696B36]/30 px-4 py-3 focus:outline-none focus:border-[#CF2F2A] text-[#696B36] font-serif text-xl placeholder:text-[#696B36]/40 transition-colors"
                                    placeholder="Your Full Name"
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
                                        className="w-full bg-white/50 border-b-2 border-[#696B36]/30 px-4 py-3 focus:outline-none focus:border-[#CF2F2A] text-[#696B36] font-serif text-xl placeholder:text-[#696B36]/40 transition-colors"
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
                                            <div className="w-6 h-6 border-2 border-[#696B36]/40 rounded-sm transition-all peer-checked:bg-[#CF2F2A] peer-checked:border-[#CF2F2A]" />
                                            <div className="absolute opacity-0 peer-checked:opacity-100 text-white pointer-events-none">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className="text-[#696B36] font-serif text-xl group-hover:text-[#CF2F2A] transition-colors">{event.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {status === "error" && (
                            <p className="text-[#CF2F2A] text-center font-sans text-sm mt-4">Something went wrong. Please try again or contact us directly.</p>
                        )}

                        <div className="pt-8 text-center">
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="bg-[#CF2F2A] hover:bg-[#8C1010] text-[#FDF9D2] font-sans font-bold tracking-widest uppercase text-sm px-12 py-5 rounded-full transition-all shadow-xl disabled:opacity-70"
                            >
                                {status === "loading" ? "Confirming..." : (sessionId ? "Update RSVP" : "Confirm RSVP")}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
