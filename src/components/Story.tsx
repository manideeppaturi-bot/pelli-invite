"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Story() {
    return (
        <section className="w-full py-24 px-4 bg-sand text-foreground relative overflow-hidden">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-serif text-crimson mb-4">Our Story</h2>
                <div className="w-24 h-[1px] bg-gold-500 mx-auto mb-16" />

                <div className="grid md:grid-cols-2 gap-12 items-center text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h3 className="text-3xl font-serif text-primary-900 leading-tight">
                            Two paths <br /> <span className="italic text-gold-500">beautifully aligned.</span>
                        </h3>
                        <p className="font-sans text-foreground/80 leading-relaxed">
                            We started as two strangers with a shared heritage and different dreams. A casual meeting turned into endless conversations, and soon enough, we realized that we had found something incredibly special.
                        </p>
                        <p className="font-sans text-foreground/80 leading-relaxed">
                            Surrounded by our wonderful families and friends, we are taking the next step in our journey together. We cannot wait to celebrate our love and heritage with all of you.
                        </p>
                    </motion.div>

                    {/* Placeholder for a beautiful portrait photo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full aspect-[4/5] rounded-t-full border-4 border-gold-400 overflow-hidden shadow-xl"
                    >
                        <div className="absolute inset-0 bg-primary-800/10 flex items-center justify-center">
                            <span className="text-gold-500 font-serif italic text-xl">Love</span>
                        </div>
                        {/* Note for User: Add your actual photo here */}
                        {/* <Image src="/couple-photo.jpg" fill alt="Manideep and Supriya" className="object-cover" /> */}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
